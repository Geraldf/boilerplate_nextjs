-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "sysID" TEXT NOT NULL,
    "rolesId" INTEGER,
    CONSTRAINT "Users_rolesId_fkey" FOREIGN KEY ("rolesId") REFERENCES "Roles" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "sysID" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Groups" (
    "sysID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "rolesId" TEXT,
    "parent_id" TEXT,
    CONSTRAINT "Groups_rolesId_fkey" FOREIGN KEY ("rolesId") REFERENCES "Roles" ("sysID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Groups_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Groups" ("sysID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_sysID_key" ON "Users"("sysID");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_sysID_key" ON "Roles"("sysID");
