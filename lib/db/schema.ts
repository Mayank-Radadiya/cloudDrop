import {
  integer,
  pgTable,
  text,
  uuid,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const files = pgTable("files", {
  id: uuid().defaultRandom().primaryKey(),
  name: text("name").notNull(),
  path: text("path").notNull(), // Path = doc/folder1/myPdf.pdf
  size: integer("size").notNull(),
  type: text("type").notNull(), // file or folder.

  //storage
  fileUrl: text("file_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),

  // Ownership
  userId: text("user_id").notNull(),
  parentId: uuid("parent_id"),

  // flags
  isFolder: boolean("is_folder").default(false).notNull(),
  isStarred: boolean("is_starred").default(false).notNull(),
  isTrash: boolean("is_trash").default(false).notNull(),

  // timestamps
  createAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// One parent has many children.
// One => many
export const fileRelations = relations(files, ({ one, many }) => ({
  // Here, parent is each folder may have parent folder or not.
  parent: one(files, {
    fields: [files.parentId],
    references: [files.id],
  }),

  // Each parent has multiple file or folder as children.
  children: many(files),
}));

// Define a File type for Backend use.(optional)
export const File = typeof files.$inferSelect;
export const newFile = typeof files.$inferInsert;
