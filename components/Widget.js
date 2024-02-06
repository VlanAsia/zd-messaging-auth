import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import styles from './Widget.module.css';

export const Widget = ({ zdToken }) => {
  const [localToken, setLocalToken] = useState('');
  const [showChat, setShowChat] = useState(false);

  /*
  const fetchData = async () => {
    try {
      const response = await fetch('/api/jwt-zendesk');
      const data = await response.json();

      setLocalToken(data);
    } catch (error) {
      console.error('Error fetching internal API:', error);
    }
  }; */

  useEffect(() => {
    // fetchData();
    const scriptList = document.querySelectorAll("script[id='ze-snippet']");
    const convertedNodeList = Array.from(scriptList);

    if (convertedNodeList.length && zdToken) {
      setTimeout(() => {
        zE('messenger', 'loginUser', function (callback) {
          callback(zdToken);
        });
      }, 1000);
    }
  }, [zdToken]);

  /*
  
  const router = useRouter();

  useEffect(() => {
    const onRouterChange = () => {
      const scriptList = document.querySelectorAll("script[id='ze-snippet']");
      const convertedNodeList = Array.from(scriptList);
      const testScript = convertedNodeList[0];

      testScript.parentNode.removeChild(testScript);

      router.reload();
    };
    router.events.on('routeChangeComplete', onRouterChange);
  }, [router]); */

  return (
    <>
      <Script
        src="https://static.zdassets.com/ekr/snippet.js?key=2f0acab0-2e20-434d-9401-3f44169e7879"
        id="ze-snippet"
      />

      <img
        className={styles.liveChatOverlay}
        src="/Chat-logo.png"
        onClick={() => {
          setShowChat(!showChat);
          showChat ? zE('messenger', 'open') : zE('messenger', 'close');
        }}
      />
    </>
  );
};
