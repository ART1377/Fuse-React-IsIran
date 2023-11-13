import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [


  {
    id: 'pages',
    // title: 'Pages',
    // subtitle: 'Custom made page designs',
    type: 'group',
    // icon: 'heroicons-outline:document',
    children: [
      {
        id: 'pages.management.base',
        title: 'اطلاعات پایه',
        type: 'collapse',
        // translate: 'اطلاعات پایه',
        // url: '/pages/management',
        children: [
          {
            id: 'pages.management.tree',
            title: 'تعریف درختواره سازمانی',
            type: 'item',
            // url: '/pages/management/system',
            // end: true,
          },
          {
            id: 'pages.management.system',
            title: 'تعریف سامانه',
            type: 'item',
            url: '/pages/management/system',
            // end: true,
          },
          {
            id: 'pages.management.log',
            title: 'تعریف لاگ',
            type: 'item',
            url: '/pages/management/log',
          },
          {
            id: 'pages.management.action',
            title: 'تعریف / تایید عمل',
            type: 'item',
            url: '/pages/management/action',
            // end: true,
          },
        ],
      },
      {
        id: 'pages.management.operation',
        title: 'عملیات اصلی',
        type: 'collapse',
        // translate: 'اطلاعات پایه',
        // url: '/pages/management',
      },
      {
        id: 'pages.management.setting',
        title: 'تنظیمات',
        type: 'collapse',
        // translate: 'اطلاعات پایه',
        // url: '/pages/management',
      },
    ]
  }





  // {
  //   id: 'example-component',
  //   title: 'Example',
  //   translate: 'EXAMPLE',
  //   type: 'item',
  //   icon: 'heroicons-outline:star',
  //   url: 'example',
  // },
];

export default navigationConfig;
