
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Eye, Calendar, Edit } from 'lucide-react';

interface BlogPostStatsCardsProps {
  totalPosts: number;
  totalViews: number;
  scheduledCount: number;
  draftCount: number;
}

const BlogPostStatsCards: React.FC<BlogPostStatsCardsProps> = ({
  totalPosts,
  totalViews,
  scheduledCount,
  draftCount,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-2xl font-bold">{totalPosts}</p>
            <p className="text-sm text-gray-500">Total articles</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Eye className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Vues totales</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-8 h-8 text-purple-500" />
          <div>
            <p className="text-2xl font-bold">{scheduledCount}</p>
            <p className="text-sm text-gray-500">Programmés</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Edit className="w-8 h-8 text-orange-500" />
          <div>
            <p className="text-2xl font-bold">{draftCount}</p>
            <p className="text-sm text-gray-500">Brouillons</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default BlogPostStatsCards;
