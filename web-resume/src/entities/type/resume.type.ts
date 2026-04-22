import type {FIO} from "@entities/resume/fio/model/type/fio.type.ts";
import type {Contact} from "@entities/resume/contact/type/contact.ts";
import type {IResumeSocialNetwork} from "@entities/resume/social-network/type/social.ts";
import type {GoalState} from "@entities/resume/goal/type/goal.ts";
import type {JobInfoState} from "@entities/resume/job-info/types/job-info.types.ts";

export interface IResume {
  fio: FIO,
  contactInfo: {
    contact: Contact,
    socialNetwork: IResumeSocialNetwork
  },
  goal: GoalState,
  jobInfo: JobInfoState
}