import { useState, useEffect } from "react";

//Styles
import "../styles/diary.css";

// Contexts
import { useTheme } from "../contexts/ThemeProviderContext";

// API
import api from '../api/configuration';
import Modal from "./Modal";

export default function Diary({ selectedDate }) {
  const todayKey = selectedDate.toISOString().split("T")[0];

  const emptyEntry = { title: "", text: "", tags: [], mood: "neutral" };
  const [entry, setEntry] = useState(emptyEntry);
  const [draft, setDraft] = useState(emptyEntry);
  const [showModal, setShowModal] = useState(false);


  const [editMode, setEditMode] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const { setTheme } = useTheme();

  useEffect(() => {
  const fetchDiary = async () => {
    try {
      const { data } = await api.get(`/diary/${todayKey}`);
      setEntry(data);
      setDraft(data);
      setTheme(data.mood || 'neutral');
    } catch {
      setEntry(emptyEntry);
      setDraft(emptyEntry);
      setTheme('neutral');
    }
  };
  fetchDiary();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [todayKey]);


  const isEmpty = !entry?.title && !entry?.text && entry?.tags?.length === 0;

  const saveDiary = async () => {
    localStorage.setItem(`diary-${todayKey}`, JSON.stringify(draft));
    setEntry(draft);
    setTheme(draft?.mood || "neutral");
    setExpanded(true);
    setEditMode(false);

    await api.post('/diary', {
      date: todayKey,
      title: draft.title,
      text:  draft.text,
      tags:  draft.tags,
      mood:  draft.mood
    });
  };

  const confirmDelete = async () => {
    await api.delete(`/diary/${todayKey}`);
    localStorage.removeItem(`diary-${todayKey}`);
    setTheme("neutral");
    setEntry(emptyEntry);
    setDraft(emptyEntry);
    setShowModal(false);
  };


  const [tagInput, setTagInput] = useState("");
  const addTag = () => {
    const t = tagInput.trim();
    if (t && !draft.tags?.includes(t)) {
      setDraft({ ...draft, tags: [...draft.tags, t] });
    }
    setTagInput("");
  };
  const removeTag = (t) =>
    setDraft({ ...draft, tags: draft.tags?.filter((x) => x !== t) });

  return (
    <div
      className={`previewDiaryContainer ${
        expanded || editMode ? "expanded" : "collapsed"
      } ${isEmpty && !editMode ? "empty" : ""}`}
    >
      <div className="paperHeader">
        <span className="diaryTitle">
          {entry.title ? entry.title : "عنوانی ننوشتی هنوز"}
        </span>
        <span>{selectedDate.toLocaleDateString("fa-IR")}</span>
      </div>

      {isEmpty && !editMode && (
        <>
          <span className="diaryPalceholder">
            شما هنوز خاطره‌ای برای امروز ننوشته‌اید!
          </span>
          <button className="writeDiaryBtn" onClick={() => setEditMode(true)}>
            نوشتن خاطره
          </button>
        </>
      )}

      {!isEmpty && !editMode && (
        <div className="diaryContextContainer">
          <p className={`diaryContent ${expanded ? "" : "collapsed"}`}>
            {entry.text}
          </p>

          {entry?.tags?.length > 0 && (
            <div className="diaryTags">
              {(expanded ? entry.tags : entry.tags.slice(0, 3)).map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
              {!expanded && entry?.tags?.length > 3 && (
                <span className="tag moreTag">{entry.tags.length - 3}+</span>
              )}
            </div>
          )}

          <div className="actions">
            <button
              className="collapsBtn"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "بستن" : "مشاهده کامل"}
            </button>
            <button
              className="editBtn"
              onClick={() => {
                setDraft(entry);
                setEditMode(true);
              }}
            >
              ادیت
            </button>
            <button className="deleteBtn" onClick={() => setShowModal(true)}>
              حذف
            </button>
          </div>
        </div>
      )}

      {editMode && (
        <div className="editDiary">
          <input
            className="titleInput"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            placeholder="عنوان خاطره"
          />

          <textarea
            className="diaryTextarea"
            value={draft.text}
            onChange={(e) => setDraft({ ...draft, text: e.target.value })}
            placeholder="خاطره‌ات را اینجا بنویس..."
            rows={8}
          />

          <div className="tagEditor">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTag()}
              placeholder="افزودن تگ"
            />
            <button className="addTagBtn" onClick={addTag}>
              افزودن
            </button>
          </div>
          {draft?.tags?.length > 0 && (
            <div className="editDiaryTags">
              {draft.tags.map((t, index) => (
                <div className="tag" key={index}>
                  <span key={t}>{t}</span>
                  <span className="removeTagBtn" onClick={() => removeTag(t)}>
                    ×
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="moodSelector">
            <span>مود امروزت:</span>
            <select
              value={draft.mood}
              onChange={(e) => setDraft({ ...draft, mood: e.target.value })}
            >
              <option value="neutral">خنثی</option>
              <option value="happy">شاد</option>
              <option value="sad">غمگین</option>
            </select>
          </div>

          <div className="actions">
            <button className="saveBtn" onClick={saveDiary}>
              ذخیره
            </button>
            <button className="discardBtn" onClick={() => setEditMode(false)}>
              انصراف
            </button>
          </div>
        </div>
      )}
      {showModal && (
        <Modal
          message="آیا مطمئنی که می‌خواهی این خاطره را حذف کنی؟"
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
          confirmTxt="آره حذفش کن"
          cancelTxt="نه نه دستم خورد"
        />
      )}
    </div>
  );
}
