import { useEffect, useRef } from 'react';

const YandexMap = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new window.ymaps.Map(mapContainer.current, {
      center: [55.751574, 37.573856],
      zoom: 13,
    });

    const placemark = new window.ymaps.Placemark(
      [55.751574, 37.573856],
      {
        hintContent: 'Order address',
        preset: 'isl`ands`#icon',
        iconColor: '#0095b6',
      },
      { draggable: true },
    );

    map.geoObjects.add(placemark);

    return () => {
      if (map && map.destroy) {
        map.destroy();
      }
    };
  }, []);

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: '100%', height: '250px' }}
    />
  );
};

export default YandexMap;
