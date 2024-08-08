import { SampleServiceModelBase } from '../base/sample-service-model-base';

export class DummySubjectSM extends SampleServiceModelBase<Int32> {
    subjectName!: string;
    subjectCode!: string;
    dummyTeacherID?: number;
}
