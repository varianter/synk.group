-- CreateTable
CREATE TABLE "recentlyplayed"
(
    "userid"   STRING    NOT NULL,
    "playedat" TIMESTAMP NOT NULL,
    "trackid"  STRING    NOT NULL,

    CONSTRAINT "primary" PRIMARY KEY ("userid", "playedat", "trackid")
);

-- CreateTable
CREATE TABLE "tokens"
(
    "id"           UUID      NOT NULL DEFAULT gen_random_uuid(),
    "userid"       STRING,
    "accesstoken"  STRING    NOT NULL,
    "refreshtoken" STRING    NOT NULL,
    "expiresat"    TIMESTAMP NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users"
(
    "id"       STRING NOT NULL,
    "lastsync" TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recentlyplayed"
    ADD CONSTRAINT "recentlyplayed_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tokens"
    ADD CONSTRAINT "tokens_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

