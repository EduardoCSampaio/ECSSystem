import Image from 'next/image';
import type { PortfolioContent, Photo } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

interface PhotoGalleryProps {
  content: PortfolioContent['gallery'];
}

const PhotoCard = ({ photo }: { photo: Photo }) => (
  <Card className="overflow-hidden group transition-shadow duration-300 hover:shadow-xl bg-card">
    <div className="aspect-square overflow-hidden">
      <Image
        src={photo.src}
        alt={photo.alt}
        width={600}
        height={600}
        className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
        data-ai-hint={photo.hint}
      />
    </div>
  </Card>
);

export function PhotoGallery({ content }: PhotoGalleryProps) {
  return (
    <section id="gallery" className="bg-card py-16 sm:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold text-foreground">{content.title}</h2>
          <p className="text-muted-foreground mt-2 text-lg">Uma amostra visual do nosso trabalho.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
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
