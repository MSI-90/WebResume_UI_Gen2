import type {SocialNetwork} from "@entities/resume/social-network/type/social.ts";
import './SocialNetworkSelect.css';
import { socialIconsMap } from "@entities/resume/social-network/lib/iconsMap.ts";
import { useEffect, useRef, useState} from "react";

interface SocialNetworkSelectProps {
  dataList: SocialNetwork[];
  id?: string;
  value?: number;
  onChange?: (e: number) => void;
}

export default function SocialNetworkSelect({dataList, id, onChange, value} : SocialNetworkSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected: SocialNetwork = dataList.find(item => item.number === value) ?? dataList[0];

  //закрытие по кнопке esc
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  //закрытие по клику вне элемента
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen])

  return (
    <div className="social-select" ref={dropdownRef} id={id}>
      <div
        className="social-select__trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected && (
          <>
            <img
              src={socialIconsMap[selected.iconUrl]}
              width={20}
              height={20}
              alt={selected.displayName}
            />
            <span>{selected.displayName}</span>
          </>
        )}
      </div>

      <div className={`social-select__dropdown ${!isOpen ? 'social-select__dropdown--hidden' : ''}`}>
        {dataList?.map((item) => (
          <div
            key={item.number}
            className="social-select__option"
            onClick={() => {
              setIsOpen(false);
              onChange?.(item.number);
            }}
          >
            <img
              src={socialIconsMap[item.iconUrl]}
              width={20}
              height={20}
              alt={item.displayName}
              className="social-select__icon"
            />
            <span>{item.displayName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}