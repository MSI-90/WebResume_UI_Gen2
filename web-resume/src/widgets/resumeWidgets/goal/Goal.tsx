import './Goal.css';
import {useCallback, useState} from "react";
import {useAppDispatch, useAppSelector} from "@app/providers/store/hooks/ReduxHooks.ts";
import {setPurposeResume} from "@entities/goal/model/goal.slice.ts";
import Button from "@shared/ui/button/Button.tsx";
import {t} from "i18next";

export default function Goal() {
  const [goal, setGoal] = useState(false);

  const maxLengthValue = 500;

  const goalChange = useCallback(() =>
    setGoal(prev => !prev),[]);

  const goalSelector = useAppSelector(state => state.goal);
  const dispatcher = useAppDispatch();

  return (
    <>
      <div className="purpose-resume" id="item-purpose">
        <div className="item-main-header">
          <h3>{t('resume.goal.title')}</h3>
        </div>
        {!goal ? (
          <div className={'purpose-resume__body'}>
            <article>
              <p>
                {t('resume.goal.articleText')}
              </p>
            </article>
            <ul>
              <li>{t('resume.goal.ul1.li1')}</li>
              <li>{t('resume.goal.ul1.li2')}</li>
              <li>{t('resume.goal.ul1.li3')}</li>
            </ul>
            <span>{t('resume.goal.span')}</span>
            <ul>
              <li>{t('resume.goal.ui2.li2_1')}</li>
              <li>{t('resume.goal.ui2.li2_2')}</li>
              <li>{t('resume.goal.ui2.li2_3')}</li>
            </ul>
          </div>
        ) : (
          <div className="item-purpose-body">
            <label htmlFor="purpose"></label>
            <div className="textarea-wrapper">
              <textarea
                id="purpose"
                name="goal"
                spellCheck="true"
                maxLength={maxLengthValue}
                value={goalSelector.purposeResume}
                placeholder={
                  t(
                    'resume.goal.textarea_placeholder', {
                    maxLengthValue: maxLengthValue
                  }
                )}
                onChange={(e) =>
                  dispatcher(setPurposeResume(e.target.value))
                }
              >
              </textarea>
              <div className="char-counter">
                {goalSelector.purposeResume.length}/{maxLengthValue}
              </div>
            </div>
          </div>
        )}
        <Button
          type={'button'}
          baseButton={false}
          onClick={goalChange}
          className={'long-button'}
          children={goal
            ? `${t('resume.goal.removeGoalButton')}`
            : `${t('resume.goal.addGoalButton')}`
          }
        />
      </div>
    </>
  )
}