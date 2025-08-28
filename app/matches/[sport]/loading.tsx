import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-8 w-16 bg-gray-800" />
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-xl bg-gray-800" />
              <div>
                <Skeleton className="h-8 w-48 mb-2 bg-gray-800" />
                <Skeleton className="h-4 w-32 bg-gray-800" />
              </div>
            </div>
          </div>

          {/* Search and Filters Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 flex-1 bg-gray-800" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-12 bg-gray-800" />
              <Skeleton className="h-8 w-12 bg-gray-800" />
              <Skeleton className="h-8 w-16 bg-gray-800" />
              <Skeleton className="h-8 w-20 bg-gray-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Market Tabs Skeleton */}
      <div className="container mx-auto px-4 py-4">
        <Skeleton className="h-10 w-full mb-6 bg-gray-800" />

        {/* Match Schedule Header Skeleton */}
        <Skeleton className="h-16 w-full mb-4 bg-gray-800 rounded-lg" />

        {/* Matches List Skeleton */}
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="grid grid-cols-12 gap-2 items-center">
                  {/* Match Info Skeleton */}
                  <div className="col-span-5 sm:col-span-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Skeleton className="h-5 w-12 bg-gray-700" />
                      <Skeleton className="w-2 h-2 rounded-full bg-gray-700" />
                    </div>
                    <Skeleton className="h-5 w-full mb-2 bg-gray-700" />
                    <Skeleton className="h-4 w-3/4 mb-2 bg-gray-700" />
                    <Skeleton className="h-3 w-1/2 mb-2 bg-gray-700" />
                    <div className="flex gap-1">
                      <Skeleton className="h-4 w-6 bg-gray-700" />
                      <Skeleton className="h-4 w-8 bg-gray-700" />
                      <Skeleton className="h-4 w-6 bg-gray-700" />
                    </div>
                  </div>

                  {/* Odds Skeletons */}
                  <div className="col-span-2 text-center">
                    <Skeleton className="h-12 w-full bg-gray-700" />
                  </div>
                  <div className="col-span-2 text-center">
                    <Skeleton className="h-12 w-full bg-gray-700" />
                  </div>
                  <div className="col-span-3 sm:col-span-2 text-center">
                    <Skeleton className="h-12 w-full bg-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
