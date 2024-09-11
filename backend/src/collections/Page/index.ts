import { CollectionConfig } from 'payload/types';
import { defaultTemplate } from './templates/default';
import { homeTemplate } from './templates/home';
import { loginTemplate } from './templates/login';
import { contactTemplate } from './templates/contact';
import { PageTemplate } from './generateTemplate';
import { collectionOverviewTemplate } from './templates/collectionOverview';
import { registerTemplate } from './templates/register';
import { forgotPasswordTemplate } from './templates/forgotPassword';
import { dashboardTemplate } from './templates/dashboard';
import { resetPasswordTemplate } from './templates/resetPassword';
import { editAccountTemplate } from './templates/editAccount';

const templates: PageTemplate[] = [
  defaultTemplate,
  homeTemplate,
  loginTemplate,
  registerTemplate,
  forgotPasswordTemplate,
  contactTemplate,
  collectionOverviewTemplate,
  dashboardTemplate,
  resetPasswordTemplate,
  editAccountTemplate
]

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    defaultColumns: ['title'],
    useAsTitle: 'title',
    hideAPIURL: process.env.NODE_ENV === 'production',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true
  },
  hooks: {
    beforeChange: [
      ({ originalDoc, data }) => { 
        if (originalDoc?.template === data.template) return data;
        const unusedTemplates = templates.filter((template) => template.name !== data.template).map(({ name }) => name);
        unusedTemplates.forEach((template) => {
          data[template] = undefined;
        });
        return data;
      }
    ]
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'template',
      type: 'select',
      required: true,
      defaultValue: 'defaultTemplate',
      options: templates.map(({ label, name }) => ({ label, value: name })),
      admin: {
        isClearable: false,
        position: 'sidebar',
      }
    },
    ...templates.map(({ field }) => field),
  ],
}

export default Pages;