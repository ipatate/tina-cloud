import { defineSchema } from "tina-graphql-gateway-cli";

export default defineSchema({
  collections: [
    {
      /*
      Each collection references a list of files
      matching the pattern in `path`. In this case,
      all files in the `_posts` directory will be
      included in this collection.
      */
      path: "content/posts",
      label: "Posts",
      name: "posts",

      templates: [
        {
          /*
          A collection will have one or more templates
          that define the shape of its entities' data.
          */
          label: "Post",
          name: "post",
          fields: [
            {
              name: "title",
              label: "Title",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
});
