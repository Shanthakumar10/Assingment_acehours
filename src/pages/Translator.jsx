import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FadeLoader } from "react-spinners";

const Translator = () => {
  const [language, setLanguage] = useState([]);
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [loader, setLoader] = useState(true);
  const [translate, setTranslate] = useState(false);

  const translation = async () => {
    const data = new URLSearchParams();
    data.append("q", sourceText);
    data.append("target", targetLang);
    data.append("source", sourceLang);

    setTranslate(true)
    const options = {
      method: "POST",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
      headers: {
        "x-rapidapi-key": "0469e50ebcmsh768ae042c8141eep15a8d2jsn35e8f56e4b50",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
      },
      data: data,
    };

    try {
      const response = await axios.request(options);
      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error(error);
    }
    setTranslate(false);
  };

  const getLang = async () => {
    const options = {
      method: "GET",
      url: "https://list-of-all-countries-and-languages-with-their-codes.p.rapidapi.com/languages",
      headers: {
        "x-rapidapi-key": "9a07c487d8mshab6a05b5ce77e4cp1ead61jsnd7e3bb8bf92f",
        "x-rapidapi-host": "list-of-all-countries-and-languages-with-their-codes.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setLanguage(response.data);
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  useEffect(() => {
    getLang();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-[#212426] p-4 min-h-screen">
      {!loader ? (
        <>
          <div className="container max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg">
            <div className="wrapper border rounded-lg p-4">
              <div className="text-input flex flex-col md:flex-row mb-4">
                <textarea
                  spellCheck="false"
                  className="from-text h-64 w-full border-none outline-none resize-none p-4 rounded-lg md:rounded-none"
                  placeholder="Enter text"
                  onChange={(e) => setSourceText(e.target.value)}
                ></textarea>
                <textarea
                  spellCheck="false"
                  readOnly
                  disabled
                  className="to-text h-64 w-full border-none outline-none resize-none p-4 rounded-lg md:rounded-none"
                  placeholder={translate ? "Translating..." : "Translation"}
                  value={sourceText? translatedText : null}
                ></textarea>
              </div>
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <select
                  className="border p-2 rounded-md bg-white text-black w-full md:w-5/12"
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                >
                  {language?.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                <select
                  className="border p-2 rounded-md bg-white text-black w-full md:w-5/12 mt-2 md:mt-0"
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                >
                  {language?.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              className="w-full p-3 mt-4 bg-[#212426] text-white rounded-md hover:bg-black transition-colors"
              onClick={translation}
            >
              Translate Text
            </button>
          </div>
        </>
      ) : (
        <FadeLoader color="#f9d3b4" className="flex justify-center items-center h-full w-full mt-10" />
      )}

      {!loader && (
        <Link
          className="table-fixed bg-white text-black py-2 px-3 rounded-lg transition-colors duration-300 mt-5 hover:bg-black hover:text-white border-2 border-transparent hover:border-white"
          to="/Movie"
        >
          Next Page
        </Link>
      )}
    </div>
  );
};

export default Translator;
