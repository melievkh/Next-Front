import { useEffect, useRef } from 'react';

type Props = {
  latitude?: number;
  longitude?: number;
};

const YandexMap = ({ latitude, longitude }: Props) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const latitude_address = latitude || 55.751574;
  const longitude_address = longitude || 37.573856;

  console.log(longitude, latitude);
  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new window.ymaps.Map(mapContainer.current, {
      center: [latitude_address, longitude_address],
      zoom: 13,
    });

    const placemark = new window.ymaps.Placemark(
      [latitude_address, longitude_address],
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
  }, [latitude_address, longitude_address]);

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: '100%', height: '250px' }}
    />
  );
};

export default YandexMap;
