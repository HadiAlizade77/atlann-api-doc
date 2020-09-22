/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
==========================================================================================*/


export default [
  // {
  //   url: "/apps/email",
  //   name: "Email",
  //   slug: "email",
  //   icon: "MailIcon",
  //   i18n: "Email",
  // },
  {
    url: '/dashboard',
    name: 'Dashboard',
    icon: 'HomeIcon',
    i18n: 'Dashboard'
  },
  {
    header: 'Management',
    i18n: 'Management',
    items: [
      {
        url: '/project-info',
        name: 'ProjectInfo',
        icon: 'PackageIcon',
        i18n: 'ProjectInfo'
      },
      {
        url: '/category/list',
        name: 'CategoryList',
        icon: 'FolderIcon',
        i18n: 'Categories'
      },
      {
        url: '/api/list',
        name: 'APIList',
        icon: 'LayersIcon',
        i18n: 'APIList'
      }
    ]
  },
  {
    header: 'DocumentExpansion',
    i18n: 'DocumentExpansion',
    items: [
      {
        url: '/api/add',
        name: 'NewApi',
        icon: 'PlusCircleIcon',
        i18n: 'NewApi'
      }
    ]
  },
]

