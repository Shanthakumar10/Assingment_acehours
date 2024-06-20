import React, { useEffect } from 'react';
import countries from '../components/data';
import { Link } from 'react-router-dom';

const Translator = () => {
  useEffect(() => {
    const fromText = document.querySelector(".from-text");
    const toText = document.querySelector(".to-text");
    const exchangeIcon = document.querySelector(".exchange");
    const selectTag = document.querySelectorAll("select");
    const translateBtn = document.querySelector("button");

    selectTag.forEach((tag, id) => {
      for (let country_code in countries) {
        let selected = id === 0
          ? country_code === "en-GB"
            ? "selected"
            : ""
          : country_code === "hi-IN"
          ? "selected"
          : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
      }
    });

    exchangeIcon.addEventListener("click", () => {
      let tempText = fromText.value;
      let tempLang = selectTag[0].value;
      fromText.value = toText.value;
      toText.value = tempText;
      selectTag[0].value = selectTag[1].value;
      selectTag[1].value = tempLang;
    });

    fromText.addEventListener("keyup", () => {
      if (!fromText.value) {
        toText.value = "";
      }
    });

    translateBtn.addEventListener("click", () => {
      let text = fromText.value.trim();
      let translateFrom = selectTag[0].value;
      let translateTo = selectTag[1].value;
      if (!text) return;
      toText.setAttribute("placeholder", "Translating...");
      let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          toText.value = data.responseData.translatedText;
          data.matches.forEach((data) => {
            if (data.id === 0) {
              toText.value = data.translation;
            }
          });
          toText.setAttribute("placeholder", "Translation");
        });
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#212426] p-4">
      <div className="container max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg">
        <div className="wrapper border rounded-lg">
          <div className="text-input flex flex-col md:flex-row">
            <textarea
              spellCheck="false"
              className="from-text h-64 w-full border-none outline-none resize-none p-4 rounded-lg md:rounded-none"
              placeholder="Enter text"
            ></textarea>
            <textarea
              spellCheck="false"
              readOnly
              disabled
              className="to-text h-64 w-full border-none outline-none resize-none p-4 rounded-lg md:rounded-none"
              placeholder="Translation"
            ></textarea>
          </div>
          <ul className="controls flex flex-col md:flex-row justify-between items-center p-4">
          <li className="row flex items-center mb-4 md:mb-0">
              <select className="border p-2 rounded-md"></select>
            </li>
            <li className="exchange mb-4 md:mb-0 md:mx-4">
              <i className="fas fa-exchange-alt cursor-pointer"></i>
            </li>
            <li className="row flex items-center">
              <select className="border p-2 rounded-md"></select>
            </li>
          </ul>
        </div>
        <button className="w-full p-3 mt-4 bg-[#212426] text-white rounded-md hover:bg-black transition-colors">
          Translate Text
        </button>
      </div>
      <Link className=" bg-white text-black py-4 px-8 rounded-lg transition-colors duration-300 mt-4 hover:bg-black hover:text-white border-2 border-transparent hover:border-white" to="/Movie">
        Next Page
      </Link>
    </div>
  );
};

export default Translator;
