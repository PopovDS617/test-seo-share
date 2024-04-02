import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { OG_IMAGE } from "../../next-seo.config";

export default function ExamplePage() {
  let shareLinkTg = "";
  let shareLinkVk = "";
  let leftIndent = 0;
  let topIndent = 0;

  const seoTitle = "Какое ваше тотемное дерево";
  const seoDescription =
    "Сберегаем вместе — платформа Сбера про экологичный и здоровый образ жизни, полезные привычки, саморазвитие, помощь людям и природе. Ежедневно мы публикуем новости и тренды, практические советы и экспертное мнение по важным темам в области ESG и устойчивого развития. Также мы рассказываем о добрых делах, благотворительных и волонтерских инициативах, помогаем вам заботиться о себе и об окружающем мире.";
  const shareResult = "Моё тотемное дерево — Сосна";
  const shareText = `%0A${shareResult}%0A%0AХочешь узнать о себе? Пройди тест на Сберегаем вместе`;

  const seoImage = {
    alt: "",
    url: "result-1.png",
    width: OG_IMAGE.WIDTH,
    height: OG_IMAGE.HEIGHT,
  };

  useEffect(() => {
    if (window !== undefined) {
      const updatedHref = window.location.href.split("?").slice(0, -1).join("");

      window.history.replaceState(null, "", updatedHref);
    }
  }, []);

  useEffect(() => {
    if (window !== undefined) {
      shareLinkTg = `https://telegram.me/share/url?url=${window.location.href}&text=${shareText}`;
      shareLinkVk = `https://vk.com/share.php?url=${window.location.href}&title=${shareText}`;
      leftIndent = (window.screen.width - windowW) / 2;
      topIndent = (window.screen.height - windowH) / 2;
    }
  }, []);

  const windowH = 500;
  const windowW = 500;

  const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=${windowW},height=${windowH},left=${leftIndent},top=${topIndent}`;

  const handleOpenShareMenuTg = () => window.open(shareLinkTg, "Тест", params);
  const handleOpenShareMenuVk = () => window.open(shareLinkVk, "Тест", params);

  const page = (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <button
        onClick={handleOpenShareMenuTg}
        className="color rounded-md bg-cyan-500 p-2 font-mono text-2xl"
      >
        share TG
      </button>
      <button
        onClick={handleOpenShareMenuVk}
        className="color rounded-md bg-cyan-500 p-2 font-mono text-2xl"
      >
        share VK
      </button>
    </div>
  );

  return (
    <>
      <NextSeo
        title="Сберегаем вместе"
        openGraph={{
          title: seoTitle,
          description: seoDescription,
          images: [seoImage],
          siteName: "Сберегаем вместе",
        }}
      />
      <div className="h-screen">
        <main className="h-full">{page}</main>
      </div>
    </>
  );
}
