-- DropForeignKey
ALTER TABLE "recentlyplayed" DROP CONSTRAINT "recentlyplayed_userid_fkey";

-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_userid_fkey";

-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "accesstoken";
ALTER TABLE "tokens" DROP COLUMN "expiresat";
ALTER TABLE "tokens" DROP COLUMN "refreshtoken";
ALTER TABLE "tokens" DROP COLUMN "userid";
ALTER TABLE "tokens" ADD COLUMN     "access_token" STRING NOT NULL;
ALTER TABLE "tokens" ADD COLUMN     "refresh_token" STRING NOT NULL;
ALTER TABLE "tokens" ADD COLUMN     "user_id" STRING;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "lastsync";
ALTER TABLE "users" ADD COLUMN     "last_sync" TIMESTAMP(6);

-- DropTable
DROP TABLE "recentlyplayed";

-- CreateTable
CREATE TABLE "albums" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "image_url" STRING NOT NULL,
    "vibrant_color" STRING,

    CONSTRAINT "albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artists" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "image_url" STRING,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "played_tracks" (
    "user_id" STRING NOT NULL,
    "played_at" TIMESTAMP(6) NOT NULL,
    "track_id" STRING NOT NULL,

    CONSTRAINT "primary" PRIMARY KEY ("user_id","played_at","track_id")
);

-- CreateTable
CREATE TABLE "track_artists" (
    "track_id" STRING NOT NULL,
    "artist_id" STRING NOT NULL,

    CONSTRAINT "primary" PRIMARY KEY ("track_id","artist_id")
);

-- CreateTable
CREATE TABLE "tracks" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "album_id" STRING NOT NULL,
    "duration" INT8 NOT NULL,
    "genre" STRING,

    CONSTRAINT "tracks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "played_tracks" ADD CONSTRAINT "recentlyplayed_userid_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "played_tracks" ADD CONSTRAINT "tracks_fk" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userid_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "track_artists" ADD CONSTRAINT "trackartists_artistid_fkey" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "track_artists" ADD CONSTRAINT "trackartists_trackid_fkey" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_album_fkey" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

