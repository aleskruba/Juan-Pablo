"use client"
import React from "react";
import Image from "next/image";
import { useLanguageContext } from "@/context/language-context";

const HeroSection = () => {
  const { selected } = useLanguageContext();

  return (
    <section id="home">
      <div className="flex flex-col text-center items-center justify-center animate-fadeIn animation-delay-2 my-2 py-16 sm:py-24 md:py-28 md:flex-row md:space-x-4 md:text-left">
        <div className="md:mt-2 md:w-1/2">
          <Image
            src="/juan.jpg"
            alt=""
            width={325}
            height={325}
            className="rounded-full shadow-2xl"
            priority={true}
          />
        </div>
        <div className="md:mt-2 md:w-3/5">
          <div>
            {selected === "Us" && (
              <>
                <h1 className="text-4xl font-bold mt-6 md:mt-0 md:text-5xl">Hi, I&apos;m Juan Pablo!</h1>
                <p className="text-lg mt-4 mb-6 md:text-2xl">
                  I was born in <span className="font-semibold text-teal-600">Medellin</span>, Colombia, and I&apos;m passionate about teaching Spanish. As a native of this beautiful city, I not only offer Spanish lessons but can also be your trusted travel guide, showcasing the wonders of Medellin.
                </p>
              </>
            )}
            {selected === "Es" && (
              <>
                <h1 className="text-4xl font-bold mt-6 md:mt-0 md:text-5xl">Hola, Soy Juan Pablo!</h1>
                <p className="text-lg mt-4 mb-6 md:text-2xl">
                  Nací en <span className="font-semibold text-teal-600">Medellin</span>, Colombia, y tengo pasión por enseñar español. Como nativo de esta hermosa ciudad, no solo ofrezco lecciones de español, sino que también puedo ser tu guía de viaje de confianza, mostrándote las maravillas de Medellín.
                </p>
              </>
            )}
            {selected === "Cz" && (
              <>
                <h1 className="text-4xl font-bold mt-6 md:mt-0 md:text-5xl">Ahoj, Jsem Juan Pablo!</h1>
                <p className="text-lg mt-4 mb-2 md:text-2xl">
                  Narodil jsem se v <span className="font-semibold text-teal-600">Medellinu</span>, v Kolumbii, a vášnivě se věnuji výuce španělštiny. Jako rodilý občan tohoto krásného města nabízím nejen lekce španělštiny, ale mohu být také vaším důvěryhodným průvodcem, který vám představí krásy Medellínu.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
