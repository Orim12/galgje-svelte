import type { Page } from '@src/payload-types';

export const getTemplateByPage = async (page: Page) => {
    let templateComponent = undefined;
    switch (page.template) {
        case 'defaultTemplate':
            templateComponent = import('@src/lib/4_templates/blocks-template/blocksTemplate.svelte')
            break;
        case 'homeTemplate':
            templateComponent = import('@templates/home-template/homeTemplate.svelte')
            break;
        case 'contactTemplate':
            templateComponent = import('@templates/contact-template/contactTemplate.svelte')
            break;
        case 'loginTemplate':
            templateComponent = import('@templates/login-template/loginTemplate.svelte')
            break;
        case 'forgotPasswordTemplate':
            templateComponent = import('@templates/forgot-password-template/forgotPasswordTemplate.svelte')
            break;
        case 'registerTemplate':
            templateComponent = import('@templates/register-template/registerTemplate.svelte')
            break;
        case 'editAccountTemplate':
            templateComponent = import('@templates/edit-account-template/editAccountTemplate.svelte')
            break;
        case 'resetPasswordTemplate':
            templateComponent = import('@templates/reset-password-template/resetPasswordTemplate.svelte')
            break;
        default:            
            throw new Error('Template not found')
    }

    return {
        component: (await templateComponent).default,
        data: page[page.template]
    }
}