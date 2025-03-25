import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create roles first
  console.log('Creating roles...');
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
    },
  });

  console.log(`Created roles: admin (${adminRole.id}), user (${userRole.id})`);

  // Create permissions
  console.log('Creating permissions...');
  const permissionData = [
    { action: 'manage', subject: 'all' },
    { action: 'read', subject: 'User' },
    { action: 'create', subject: 'User' },
    { action: 'update', subject: 'User' },
    { action: 'delete', subject: 'User' },
    { action: 'read', subject: 'Profile' },
    { action: 'update', subject: 'Profile' },
    { action: 'read', subject: 'Settings' },
    { action: 'update', subject: 'Settings' },
    { action: 'manage', subject: 'Permissions' },
  ];

  const permissions = [];

  for (const perm of permissionData) {
    const permission = await prisma.permission.upsert({
      where: {
        id: `${perm.action}_${perm.subject}`,
      },
      update: {},
      create: {
        id: `${perm.action}_${perm.subject}`,
        action: perm.action,
        subject: perm.subject,
      },
    });
    permissions.push(permission);
    console.log(`Created permission: ${perm.action}_${perm.subject}`);
  }

  // Connect permissions to roles
  console.log('Connecting permissions to roles...');

  // Admin gets all permissions
  await prisma.role.update({
    where: { id: adminRole.id },
    data: {
      permissions: {
        connect: permissions.map(p => ({ id: p.id }))
      }
    }
  });

  // User role gets basic permissions
  await prisma.role.update({
    where: { id: userRole.id },
    data: {
      permissions: {
        connect: permissions
          .filter(p =>
            (p.action === 'read' || p.id === 'update_Profile' || p.id === 'update_Settings') &&
            p.subject !== 'Permissions'
          )
          .map(p => ({ id: p.id }))
      }
    }
  });

  // Create users
  console.log('Creating users...');
  const saltRounds = 10;
  const defaultPassword = await bcrypt.hash('password123', saltRounds);

  // Create admin user
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      userName: 'admin',
      name: 'Admin',
      surname: 'User',
      password: defaultPassword,
      roleId: adminRole.id,
      isActive: true,
      twoFactorEnabled: false,
      phoneNo: '+905551112233',
      registerIp: '127.0.0.1',
    },
  });

  // Create regular users
  const userNames = ['john', 'jane', 'robert', 'sarah', 'michael', 'emma', 'david', 'olivia', 'james'];
  const names = ['John', 'Jane', 'Robert', 'Sarah', 'Michael', 'Emma', 'David', 'Olivia', 'James'];
  const surnames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];

  for (let i = 0; i < userNames.length; i++) {
    await prisma.user.upsert({
      where: { email: `${userNames[i]}@example.com` },
      update: {},
      create: {
        email: `${userNames[i]}@example.com`,
        userName: userNames[i],
        name: names[i],
        surname: surnames[i],
        password: defaultPassword,
        roleId: userRole.id,
        isActive: true,
        twoFactorEnabled: false,
        phoneNo: `+9055511${i+1000}`,
        registerIp: '127.0.0.1',
      },
    });
    console.log(`Created user: ${userNames[i]}`);
  }

  console.log('Database seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });