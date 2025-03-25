-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "userName" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "emailVerifiedAt" TIMESTAMP(3),
    "password" VARCHAR(255) NOT NULL,
    "surname" VARCHAR(100) NOT NULL,
    "identityNo" VARCHAR(20),
    "avatarImage" VARCHAR(255),
    "socialInstagram" VARCHAR(100),
    "socialInstagramBroadcastChannel" VARCHAR(100),
    "socialFacebook" VARCHAR(100),
    "socialFacebookGroup" VARCHAR(100),
    "socialFacebookPage" VARCHAR(100),
    "socialYoutube" VARCHAR(100),
    "socialTiktok" VARCHAR(100),
    "socialLinkedin" VARCHAR(100),
    "socialX" VARCHAR(100),
    "socialWhatsappTelNo" VARCHAR(20),
    "socialWhatsappGroup" VARCHAR(100),
    "socialWhatsappChannel" VARCHAR(100),
    "socialTelegramUsername" VARCHAR(100),
    "socialTelegramGroup" VARCHAR(100),
    "socialTelegramChannel" VARCHAR(100),
    "socialReddit" VARCHAR(100),
    "socialRedditCommunity" VARCHAR(100),
    "phoneNo" VARCHAR(20),
    "roleId" TEXT NOT NULL,
    "twoFactorSecret" TEXT,
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "refreshToken" TEXT,
    "githubId" VARCHAR(100),
    "googleId" VARCHAR(100),
    "facebookId" VARCHAR(100),
    "instagramId" VARCHAR(100),
    "registerIp" VARCHAR(45),
    "lastLoggedInIp" VARCHAR(45),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "inverted" BOOLEAN NOT NULL DEFAULT false,
    "conditions" JSONB,
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RolePermissions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RolePermissions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_userName_idx" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE INDEX "_RolePermissions_B_index" ON "_RolePermissions"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RolePermissions" ADD CONSTRAINT "_RolePermissions_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RolePermissions" ADD CONSTRAINT "_RolePermissions_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
