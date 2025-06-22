import { Suspense } from 'react'
import DashboardClientPage from './dashboard-client-page'

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardClientPage />
    </Suspense>
  )
} 