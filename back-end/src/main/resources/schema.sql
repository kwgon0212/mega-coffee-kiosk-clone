-- schema.sql
ALTER TABLE member
  MODIFY COLUMN member_id CHAR(36)
    CHARACTER SET ascii NOT NULL;
