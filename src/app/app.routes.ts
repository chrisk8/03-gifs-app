import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'footer',
        loadComponent: () =>
            import( './shared/basic-foot/basic-foot.component' )
    },
    {
        path: 'dashboard',
        loadComponent: () => 
            import( './gifs/pages/dashboard-page/dashboard-page.component' ),
        //Aqui se usan las rutas hijas para definir los componentes que se van a mostrar a un costado del dashboard de la pagina principal
        //Las rutas hijas son un arreglo de rutas que estan dentro del dashboard - http://localhost:4200/dashboard/search
        //Para mostrar los componentes, se usa la etiqueta router outlet al final del  HTML
        children: [
            {
                path: 'search',
                loadComponent: () => 
                    import( './gifs/pages/search-page/search-page.component' ),
            },
            {
                path: 'trending',
                loadComponent: () => 
                    import( './gifs/pages/trending-page/trending-page.component' ),
            },
            {
                path: '**',
                redirectTo: 'trending'
            }
        ]
    },
    {
        path:'**',
        redirectTo: 'dashboard'
    }
];
