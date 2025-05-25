import {createBrowserRouter} from 'react-router';

export const router= createBrowserRouter([
    {
        index: true,
        element: <Home></Home>
    },
    {
        path: '/blogspace',
        element: <BlogSpace></BlogSpace>
    },
])