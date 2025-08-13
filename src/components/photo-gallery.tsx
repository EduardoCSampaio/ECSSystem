import Image from 'next/image';
import type { PortfolioContent, Photo } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

interface PhotoGalleryProps {
  content: PortfolioContent['gallery'];
}

const PhotoCard = ({ photo }: { photo: Photo }) => (
  <Card className="overflow-hidden group transition-shadow duration-300 hover:shadow-xl bg-card">
    <div className="aspect-[4/3] overflow-hidden">
      <Image
        src={photo.src}
        alt={photo.alt}
        width={600}
        height={450}
        className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
        data-ai-hint={photo.hint}
      />
    </div>
  </Card>
);

export function PhotoGallery({ content }: PhotoGalleryProps) {
  return (
    <section id="gallery" className="bg-secondary/20 py-16 sm:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground">{content.title}</h2>
          <p className="text-muted-foreground mt-2 text-lg">Conheça o ambiente que inspira nossa inovação.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {content.photos.map((photo, index) => (
            <div key={photo.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <PhotoCard photo={photo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
