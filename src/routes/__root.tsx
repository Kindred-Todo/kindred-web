import { Outlet, createRootRoute } from '@tanstack/react-router'
import { SmoothScroll } from '../components/SmoothScroll'

export const Route = createRootRoute({
  component: () => (
    <SmoothScroll>
      <Outlet />
    </SmoothScroll>
  ),
})
