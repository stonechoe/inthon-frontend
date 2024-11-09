"use client";

import { CardProps } from "@/app/api/paths/route";
import Card from "@/components/Card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

const REVIEW_PER_PAGE = 10;

const MOCKING_REVIEWS = [
  "이렇게 멋진 공연은 정말 오랜만이에요! 가수가 등장하는 순간부터 공연이 끝나는 마지막 순간까지 완전히 몰입할 수밖에 없었어요. 특히 무대 연출과 조명이 한층 업그레이드된 느낌이었고, 곡의 분위기와 딱 맞아떨어지더군요. 라이브로 들으니 음원에서는 느끼지 못했던 감정이 밀려왔고, 가수의 목소리가 훨씬 생동감 있게 다가왔습니다. 관객과 함께하는 소통의 시간도 인상 깊었고, 한 곡 한 곡 모두 진심을 다해 부르는 모습이 정말 감동적이었어요. 내년에도 꼭 다시 보고 싶습니다. 진짜 잊지 못할 밤이었어요!",
  "콘서트가 이렇게 감동적일 줄은 정말 예상 못했어요. 공연장은 가득 찬 팬들의 함성으로 시작부터 압도적이었고, 가수가 등장하자마자 모든 사람이 환호했죠. 첫 곡부터 에너지가 넘쳤고, 무대에서 퍼져 나오는 힘이 대단했어요. 특히 중간에 특별 게스트가 등장하는 깜짝 이벤트가 있었는데, 팬들을 위한 배려가 돋보였고 그 순간의 열기는 최고조였어요. 그리고 마지막 곡에서는 모든 관객이 하나가 되어 노래를 불렀는데, 마치 거대한 하나의 합창단이 된 듯한 느낌이었어요. 행복과 여운이 가득 남는 공연이었습니다.",
  "처음부터 끝까지 온전히 몰입했던 공연이었습니다. 가수의 강렬한 퍼포먼스와 감정 넘치는 목소리가 큰 감동을 줬어요. 특히 마지막 곡에서 관객들과 함께 노래 부를 때는 정말 울컥했습니다. 내년에도 꼭 다시 오고 싶어요!",
  "오랜만에 느껴본 짜릿한 전율의 공연이었어요. 라이브가 음원보다 훨씬 다채롭고 강렬하게 다가왔습니다. 관객과 호흡하는 모습에서 가수의 진심이 느껴졌고, 음악과 조명, 무대 연출이 모두 완벽히 어우러진 멋진 경험이었어요.",
  "무대 위에서 폭발하는 에너지가 대단했어요. 평소 좋아했던 곡들을 라이브로 들으니 감동이 배가되더군요. 그들만의 독특한 무대 연출과 조명이 몰입감을 더해줬고, 공연 후에도 그 여운이 쉽게 가시지 않았습니다.",
  "평생 기억에 남을 만한 공연이었어요. 처음부터 끝까지 스펙터클한 무대 연출과 놀라운 퍼포먼스에 넋이 나갔습니다. 다양한 장르의 음악을 모두 라이브로 들을 수 있어 진정한 팬으로서 감동이 넘쳤어요. 기대 이상이었어요!",
  "와, 정말 환상적이었어요! 생생한 사운드와 멋진 무대 연출 덕분에 잊지 못할 밤이 됐습니다.",
  "공연 시간이 너무 짧게 느껴질 만큼 즐거운 시간이었어요! 내년에도 꼭 다시 오고 싶네요.",
  "그들의 음악을 직접 들을 수 있어서 행복했어요. 라이브가 음원보다 훨씬 좋았어요.",
  "전체적으로 좋았지만 음향이 약간 아쉬웠어요. 그래도 열정적인 무대는 최고였어요!",
  "정말 대단했어요. 특히 마지막 곡에서 모든 관객이 함께 노래하는 장면은 감동적이었어요.",
  "가수의 목소리가 너무나도 감미로웠고, 무대 연출이 정말 환상적이었어요. 특히 중간에 있었던 레이저 쇼는 정말 압권이었고, 그 순간 모든 관객들이 하나가 된 느낌이었어요. 공연이 끝난 후에도 그 여운이 쉽게 가시지 않았습니다. 내년에도 꼭 다시 보고 싶어요. 정말 잊지 못할 밤이었어요!",
  "가수의 목소리가 정말 강렬했어요. 라이브의 매력을 새삼 느꼈습니다.",
  "이렇게 많은 사람들이 함께 즐기는 공연은 정말 특별한 경험이에요.",
  "기대 이상이었어요. 무대 연출, 조명, 사운드 전부 완벽했습니다.",
  "가수와 밴드의 케미가 정말 좋았어요. 공연 내내 집중할 수밖에 없었어요.",
  "공연장이 너무 더웠지만 그마저도 잊게 만들 정도로 신나는 공연이었어요.",
  "다음에 또 온다면 무조건 가겠습니다. 에너지가 넘치는 멋진 무대였습니다!",
  "너무 감동적이었어요. 라이브에서 느낄 수 있는 진한 감정이 최고였어요.",
  "사운드 시스템이 조금 아쉬웠지만 가수의 열정이 이를 덮어주더군요!",
  "오랜만에 느낀 전율이에요. 가슴이 두근거리고 행복했습니다.",
  "공연 시간 내내 서서 응원했는데 전혀 지치지 않았어요. 정말 좋은 시간!",
  "예상보다 무대가 웅장해서 놀랐어요. 실제로 보니 더 감동이었어요.",
  "특별 게스트 등장할 줄 몰랐는데 너무 놀랍고 좋았어요!",
  "공연에 몰입하게 만드는 연출이 대단했어요. 눈을 뗄 수가 없었어요.",
  "음악, 조명, 그리고 관객들의 환호까지 완벽했던 공연이었어요.",
  "평생 기억에 남을 공연이었어요. 내년에도 꼭 참여하고 싶어요.",
  "정말 감성적이고 몽환적인 무대였어요. 라이브로 들으니 더 매력적이더군요.",
  "처음부터 끝까지 완벽하게 짜여진 공연이었어요. 다시 보고 싶어요!",
  "실제로 보니 더 멋있었어요. 팬이 될 수밖에 없는 무대였습니다.",
  "가수의 목소리가 무대 위에서 더 빛나더군요. 소름 돋는 순간이었어요.",
  "공연장에서 다 같이 노래 부를 때 정말 뭉클했어요. 잊지 못할 순간입니다.",
  "조명과 무대 연출이 정말 좋았어요. 마치 다른 세계에 온 듯했어요.",
  "공연을 다 보고 나니 마음이 따뜻해졌어요. 행복한 시간이었습니다.",
  "이렇게 열정적인 무대는 처음이에요. 라이브의 매력을 제대로 느꼈어요.",
  "공연의 퀄리티가 너무 좋았어요. 직접 볼 수 있어서 좋았습니다.",
  "팬 서비스도 최고였고, 팬들과의 소통도 완벽했어요. 사랑이 느껴졌습니다.",
  "정말 준비 많이 한 게 느껴졌어요. 관객들까지 완벽히 배려한 공연!",
  "무대 디자인이 너무 예뻤어요. 끝나는 게 너무 아쉬웠어요.",
  "정말 멋진 공연이었어요. 가수의 목소리와 퍼포먼스가 최고였어요. 특히 마지막 곡에서 모든 관객이 함께 노래하는 장면은 감동적이었어요. 내년에도 꼭 다시 보고 싶어요. 잊지 못할 밤이었습니다.",
  "공연이 끝난 후에도 여운이 가시지 않았어요. 정말 행복한 시간이었습니다. 내년에도 꼭 다시 오고 싶어요.",
];

const fakeReviews: CardProps[] = MOCKING_REVIEWS.map((content) => ({
  title: "...",
  description: content,
}));

// TODO use real api
const getReviewsMocking = async (page: number) => {
  const deeeeepcopy = JSON.parse(JSON.stringify(fakeReviews)) as CardProps[];
  return {
    reviews: deeeeepcopy.slice(
      (page - 1) * REVIEW_PER_PAGE,
      page * REVIEW_PER_PAGE
    ),
    totalCount: fakeReviews.length,
    nextPage: fakeReviews.length > page * REVIEW_PER_PAGE ? page + 1 : null,
  };
};

export default function GalleryPage() {
  const { data, fetchNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: ["gallery"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getReviewsMocking(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    select: (data) => (data.pages ?? []).flatMap((page) => page.reviews),
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  const useObserver = ({
    target,
    rootMargin = "0px",
    threshold = 1.0,
    onIntersect,
  }: {
    target: React.RefObject<HTMLElement>;
    rootMargin?: string;
    threshold?: number;
    onIntersect: IntersectionObserverCallback;
  }) => {
    useEffect(() => {
      let observer: IntersectionObserver | undefined;

      if (target && target.current) {
        observer = new IntersectionObserver(onIntersect, {
          root: null,
          rootMargin,
          threshold,
        });

        observer.observe(target.current);
      }
      return () => observer && observer.disconnect();
    }, [target, rootMargin, threshold, onIntersect]);
  };

  const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
    entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottomRef,
    onIntersect,
  });

  if (isError) return <div>에러가 발생했습니다</div>;

  if (isLoading) return <div>로딩 중...</div>;

  if (!data) return <div>데이터가 없습니다</div>;

  return (
    <div className="w-full h-full flex flex-col gap-16 px-8 items-center">
      <h1 className="w-full text-center font-bold text-2xl">
        ...님의 작품을 소개합니다.
      </h1>
      {data.map((_, index) => (
        <Card key={index} imagePath="/dino.png" title="..." description="..." />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
