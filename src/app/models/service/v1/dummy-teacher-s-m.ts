import { SampleServiceModelBase } from '../base/sample-service-model-base';

export class DummyTeacherSM extends SampleServiceModelBase<number> {
    firstName!: string;
    lastName!: string;
    emailAddress!: string;
}
