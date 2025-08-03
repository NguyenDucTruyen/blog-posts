import { useEffect, useState } from 'react';
import { CustomButtonDemo } from './modules/demos/button-demo-page';
import { NotFoundPage } from './modules/error/not-found-page';
import { DetailPostPage } from './modules/post/post-detail/post-detail-page';
import { PostPage } from './modules/post/post-list/post-list-page';
const routes = [
  {
    path: '/',
    component: PostPage,
  },
  {
    path: '/post/:id',
    component: DetailPostPage,
  },
  {
    path: '/demo/button',
    component: CustomButtonDemo,
  },
];

// Helper function to match routes with parameters
function matchRoute(pathname: string) {
  for (const route of routes) {
    const pathParts = pathname.split('/');
    const routeParts = route.path.split('/');

    if (pathParts.length !== routeParts.length) {
      continue;
    }

    const params: { [key: string]: string } = {};
    let isMatch = true;

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        const paramName = routeParts[i].slice(1);
        params[paramName] = pathParts[i];
      } else if (routeParts[i] !== pathParts[i]) {
        isMatch = false;
        break;
      }
    }

    if (isMatch) {
      return { route, params };
    }
  }

  return null;
}

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    // Handle browser back/forward buttons
    const handlePopState = () => {
      const newPathname = window.location.pathname;
      setPathname(newPathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pathname]);

  const match = matchRoute(pathname);

  if (!match) {
    console.error(`No route found for path: ${pathname}`);
    return <NotFoundPage />;
  }

  const { route, params } = match;
  const Component = route.component;

  return (
    <div className='App'>
      <div>
        <Component params={params} />
      </div>
    </div>
  );
}

export default App;
