import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'isHeadline',
      title: 'Set as Headline',
      type: 'boolean',
      description: 'Only one post can be the headline at a time. Checking this will require unchecking the previous headline.',
      initialValue: false,
      validation: (Rule) =>
        Rule.custom(async (isHeadline, context) => {
          // If the box is unchecked, it is always valid
          if (!isHeadline) return true;

          // Ensure we have access to the client and document
          const { getClient, document } = context;
          if (!document || !document._id) return true;

          // Remove 'drafts.' prefix to check against both draft and published versions
          const documentId = document._id.replace(/^drafts\./, '');
          const client = getClient({ apiVersion: '2023-01-01' });

          // Query to find if any *other* post currently has isHeadline set to true
          const query = `*[_type == "post" && isHeadline == true && !(_id in [$id, "drafts." + $id])][0]`;
          const existingHeadline = await client.fetch(query, { id: documentId });

          // If another headline exists, throw a validation error
          if (existingHeadline) {
            return `"${existingHeadline.title}" is already the headline. Please uncheck it first.`;
          }

          return true;
        }),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Bencana Alam', value: 'Bencana Alam' },
          { title: 'Pendidikan', value: 'Pendidikan' },
          { title: 'Komunitas', value: 'Komunitas' }
        ],
        layout: 'dropdown'
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
			fields: [
				defineField({
					name: 'alt',
					title: 'Alternative text',
					type: 'string',
				}),
			],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
