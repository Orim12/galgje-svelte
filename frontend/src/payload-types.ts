/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    media: Media;
    pages: Page;
    blogs: Blog;
    redirects: Redirect;
    category: Category;
    products: Product;
    words: Word;
    scores: Score;
    search: Search;
    forms: Form;
    'form-submissions': FormSubmission;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {
    header: Header;
    footer: Footer;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  name?: string | null;
  role: 'admin' | 'product-editor' | 'customer' | 'business-customer';
  firstLetters?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  mobileNumber?: string | null;
  shippingAddress?: {
    postalCode: string;
    houseNumber: string;
    houseNumberAddition?: string | null;
    street: string;
    city: string;
    country: string;
  };
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  focusX?: number | null;
  focusY?: number | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  sizes?: {
    original?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    fullSize?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    tablet?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    desktop?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    fullscreen?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  title: string;
  template:
    | 'defaultTemplate'
    | 'homeTemplate'
    | 'loginTemplate'
    | 'registerTemplate'
    | 'forgotPasswordTemplate'
    | 'contactTemplate'
    | 'collectionOverviewTemplate'
    | 'dashboardTemplate'
    | 'resetPasswordTemplate'
    | 'editAccountTemplate';
  defaultTemplate?: {
    blocks: (GalgjeBlock | FiftyFiftyBlock | GoToBlock | HeaderPhotoSection | FormBlock | RichTextBlock)[];
  };
  homeTemplate?: {
    description: {
      [k: string]: unknown;
    }[];
    blocks?: (GalgjeBlock | FiftyFiftyBlock | GoToBlock | HeaderPhotoSection | FormBlock | RichTextBlock)[] | null;
  };
  loginTemplate?: {
    title: string;
    description: string;
    referralLink?: (string | null) | Page;
    forgotPassword?: Button;
    register?: Button;
  };
  registerTemplate?: {
    title: string;
    description: string;
    referralLink?: (string | null) | Page;
    login?: Button;
  };
  forgotPasswordTemplate?: {
    title: string;
    description: string;
    register?: Button;
    login?: Button;
  };
  contactTemplate?: {
    blocks?: (GalgjeBlock | FiftyFiftyBlock | GoToBlock | HeaderPhotoSection | FormBlock | RichTextBlock)[] | null;
  };
  collectionOverviewTemplate?: {
    title: string;
    description?: string | null;
    categories?:
      | {
          name: string;
          category: (string | Category)[];
          id?: string | null;
        }[]
      | null;
  };
  dashboardTemplate?: {
    title: string;
    description: string;
    buttons?:
      | {
          button?: Button;
          id?: string | null;
        }[]
      | null;
  };
  resetPasswordTemplate?: {
    title: string;
    description: string;
    referralLink?: (string | null) | Page;
  };
  editAccountTemplate?: {
    title: string;
    description: string;
  };
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: string | Media | null;
  };
  slugField?: string | null;
  slug?: string | null;
  editSlug?: boolean | null;
  url?: string | null;
  urls?:
    | {
        id?: string | null;
      }[]
    | null;
  isHome?: boolean | null;
  parent?: (string | null) | Page;
  breadcrumbs?:
    | {
        doc?: (string | null) | Page;
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "GalgjeBlock".
 */
export interface GalgjeBlock {
  wordList?:
    | {
        word?: string | null;
        id?: string | null;
      }[]
    | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'galgje';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FiftyFiftyBlock".
 */
export interface FiftyFiftyBlock {
  title?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'fiftyFiftyBlock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "GoToBlock".
 */
export interface GoToBlock {
  niks?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'goTo';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "headerPhotoSection".
 */
export interface HeaderPhotoSection {
  title?: string | null;
  image: string | Media;
  height: string;
  id?: string | null;
  blockName?: string | null;
  blockType: 'headerPhoto';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "formBlock".
 */
export interface FormBlock {
  form: string | Form;
  id?: string | null;
  blockName?: string | null;
  blockType: 'form';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "forms".
 */
export interface Form {
  id: string;
  title: string;
  description: string;
  formSubmissionTitle: string;
  fields?:
    | {
        value: FormField;
        id?: string | null;
      }[]
    | null;
  emails?:
    | {
        sendTo: 'submitter' | 'custom';
        emailField?: string | null;
        email?: string | null;
        subject: string;
        body: string;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FormField".
 */
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'email' | 'tel';
  required?: boolean | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "richTextBlock".
 */
export interface RichTextBlock {
  content: {
    [k: string]: unknown;
  }[];
  id?: string | null;
  blockName?: string | null;
  blockType: 'richTextblock';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Button".
 */
export interface Button {
  label?: string | null;
  buttonType?: ('button' | 'greenButton' | 'blueButton' | 'orangeButton') | null;
  linkType?: ('none' | 'internal' | 'external' | 'externalNewTab' | 'scroll') | null;
  linkInternal?: {
    relationTo: 'pages';
    value: string | Page;
  } | null;
  linkExternal?: string | null;
  linkScroll?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "category".
 */
export interface Category {
  id: string;
  title: string;
  slug?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blogs".
 */
export interface Blog {
  id: string;
  title: string;
  first_block: {
    imageOnLeft?: boolean | null;
    title: string;
    description: string;
    image: string | Media;
  };
  other_blocks?:
    | {
        imageOnLeft?: boolean | null;
        title: string;
        description: string;
        image: string | Media;
        id?: string | null;
      }[]
    | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: string | Media | null;
  };
  slugField?: string | null;
  slug?: string | null;
  editSlug?: boolean | null;
  url?: string | null;
  urls?:
    | {
        id?: string | null;
      }[]
    | null;
  isHome?: boolean | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects".
 */
export interface Redirect {
  id: string;
  title: string;
  from?: {
    internal?: {
      relationTo: 'pages';
      value: string | Page;
    } | null;
    external?: string | null;
    type?: ('internal' | 'external') | null;
  };
  to?: {
    internal?: {
      relationTo: 'pages';
      value: string | Page;
    } | null;
    external?: string | null;
    type?: ('internal' | 'external') | null;
  };
  type: '301' | '302';
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "products".
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  images?:
    | {
        image: string | Media;
        id?: string | null;
      }[]
    | null;
  richTextFields: RichTextFields;
  blocks: {
    content?: RichTextBlock[] | null;
  };
  category?: (string | Category)[] | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: string | Media | null;
  };
  title: string;
  slugField?: string | null;
  slug?: string | null;
  editSlug?: boolean | null;
  url?: string | null;
  urls?:
    | {
        id?: string | null;
      }[]
    | null;
  isHome?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "richTextFields".
 */
export interface RichTextFields {
  content: {
    [k: string]: unknown;
  }[];
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "words".
 */
export interface Word {
  id: string;
  word: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "scores".
 */
export interface Score {
  id: string;
  score: number;
  plrname: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "search".
 */
export interface Search {
  id: string;
  title?: string | null;
  priority?: number | null;
  doc:
    | {
        relationTo: 'pages';
        value: string | Page;
      }
    | {
        relationTo: 'blogs';
        value: string | Blog;
      };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "form-submissions".
 */
export interface FormSubmission {
  id: string;
  form: string | Form;
  title: string;
  fields?:
    | {
        label: string;
        value: string;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header".
 */
export interface Header {
  id: string;
  menu?:
    | {
        label: string;
        page: string | Page;
        id?: string | null;
      }[]
    | null;
  locales: ('nl' | 'en')[];
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: string;
  title: string;
  updatedAt?: string | null;
  createdAt?: string | null;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}