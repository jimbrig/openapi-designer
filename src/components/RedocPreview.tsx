import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useApiStore } from '../stores/ApiStore';

const RedocPreview: React.FC = observer(() => {
  const apiStore = useApiStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let redocElement: HTMLElement | null = null;

    const initRedoc = async () => {
      if (containerRef.current) {
        const { RedocStandalone } = await import('redoc');
        
        // Remove existing Redoc element if it exists
        if (redocElement) {
          redocElement.remove();
        }

        // Create a new div for Redoc
        redocElement = document.createElement('div');
        containerRef.current.appendChild(redocElement);

        // Initialize Redoc
        RedocStandalone.init(
          apiStore.apiSpec,
          {
            scrollYOffset: 50,
          },
          redocElement
        );
      }
    };

    initRedoc();

    // Cleanup function
    return () => {
      if (redocElement) {
        redocElement.remove();
      }
    };
  }, [apiStore.apiSpec]);

  return <div ref={containerRef} />;
});

export default RedocPreview;