'use client';

import { useEffect } from "react";
import ShareIcon from 'public/icons/share.svg';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

export default function ShareButton({ isShare, linkUrl, title, description, imagePath }: { isShare: boolean, linkUrl: string, title: string, description: string, imagePath: string }) {
  useEffect(() => {
    // 카카오 SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_APP_KEY); // 환경변수로 설정한 Kakao App Key 사용
    }
  }, []);

  const handleButtonClick = () => {
    if (isShare) {
      if (window.Kakao) {
        window.Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: title,
            description: description,
            imageUrl: imagePath,
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
          buttons: [
            {
              title: "웹으로 보기",
              link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href,
              },
            },
          ],
        });
      } else if (navigator.share) {
        // Web Share API 사용 (모바일 지원)
        try {
          navigator
            .share({
              title: title,
              text: description,
              url: window.location.href,
            })
            .catch((error) => { console.log("공유에 실패했습니다.", error); });
        } catch (error) {
          console.log("공유에 실패했습니다.", error);
        }
        
      } else {
        // 데스크톱에서 사용할 네이버 공유 링크
        const naverShareUrl = `https://share.naver.com/web/shareView?url=${encodeURIComponent(
          window.location.href
        )}&title=${encodeURIComponent(title)}`;
        window.open(naverShareUrl, "_blank");
      }
    } else {
      // 링크로 이동
      window.location.href = linkUrl;
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // 카드 전체의 클릭 이벤트와 분리
        handleButtonClick();
      }}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full font-semibold hover:bg-blue-600 transition flex flex-row items-center justify-center gap-4"
    >
      <div className="inline">
      <ShareIcon />
      </div>
      <span>
      {isShare ? "공유하기" : "링크로 이동"}
      </span>
    </button>
  );
}