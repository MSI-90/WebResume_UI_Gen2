import type {RootState} from "@app/providers/store/Store";
import {createDraftSafeSelector} from "@reduxjs/toolkit";
import type {IResume} from "@entities/type/resume.type.ts";
import type {FIO} from "@entities/resume/fio/model/type/fio.type.ts";
import type {Contact} from "@entities/resume/contact/type/contact.ts";
import type {GoalState} from "@entities/resume/goal/type/goal.ts";
import type {JobInfoState} from "@entities/resume/job-info/types/job-info.types.ts";
import type {IResumeSocialNetwork} from "@entities/resume/social-network/type/social.ts";


export const resumeSelector = createDraftSafeSelector(
  (state: RootState) => state.fio,
  (state: RootState) => state.contact,
  (state: RootState) => state.social,
  (state: RootState) => state.goal,
  (state: RootState) => state.jobInfo,
  (fio: FIO, contactInfo: Contact, social: IResumeSocialNetwork, goal: GoalState, jobInfo: JobInfoState): IResume => ({
    fio: fio,
    contactInfo: {
      contact: contactInfo,
      socialNetwork: social
    },
    goal: goal,
    jobInfo: jobInfo
  })
);

