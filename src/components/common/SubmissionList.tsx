import { ChangeEvent, ChangeEventHandler, FC, ReactNode, useState } from 'react';
import { find, map } from 'lodash'
import { SubmissionSelect } from '~/server/routers/submission';
import { ReactSVG } from 'react-svg'
import { TypeOfDocument } from '~/server/routers/typeDocument';
import CheckBox from 'react-animated-checkbox';
import { trpc } from '~/utils/trpc';

interface ISubmissionListProps {
    submissions: SubmissionSelect[];
    typesOfDocument: TypeOfDocument[];
    createSubmission: (fileName: string, documentBody: string, typeDocumentId: number) => Promise<void>;
};

interface ISubmissionItemProps {
    typeOfDocument: TypeOfDocument;
    nameDoc: string;
    isSubmitted: boolean;
    isCompleted: boolean;
    onUploadInput: (e: any, typeDocumentId: number) => void;
}

const iconResolver = (typeDoc: number): ReactNode => {
    switch (typeDoc) {
        case 1:
            return <ReactSVG src='/svg/militatyId.svg'/>
        case 2:
            return <ReactSVG src='/svg/document.svg'/>
        case 3:
            return <ReactSVG src='/svg/bill.svg'/>
        case 4:
            return <ReactSVG src='/svg/photo.svg'/>
        case 5:
            return <ReactSVG src='/svg/IdCard.svg'/>
        case 6:
            return <ReactSVG src='/svg/document.svg'/>
        default: return null;
    }
};

const SubmissionItem: FC<ISubmissionItemProps> = (props) => {
    const uploadFile = (e: any): void => {
        props.onUploadInput(e, props.typeOfDocument.id)
    };

    const uploadInput = (): ReactNode => {
        return [1, 2, 3, 4].includes(props.typeOfDocument.id) ?  
        <div>
            <label htmlFor="file-input" className='fileInput'>
                <ReactSVG src='/svg/uploadFile.svg'/>
            </label>
            <input
            id="file-input"
            type="file"
            onChange={uploadFile}
            style={{ display: 'none'}}
            />
        </div> : null;
    };

    const waitVerfiInput = (): ReactNode => {
        const title = 'Відправлено документ ' + props.nameDoc;
        return (
            <div title={title}>
                <ReactSVG src='/svg/wait.svg'/>
            </div>
        );
    };

    const resolveInputs = (): ReactNode => {
        if(!props.isCompleted) 
            return uploadInput();
        if(props.isCompleted && !props.isSubmitted)
            return waitVerfiInput();
        return null;
    };

    const isChecked = [5, 6].includes(props.typeOfDocument.id) ? true : (props.isSubmitted ? props.isSubmitted : false);
    return (
        <div className="submissionItemContainer" key={props.typeOfDocument.id}>
            <div className="docBlock">
                <div>{iconResolver(props.typeOfDocument?.id)}</div>
                <div>{props.typeOfDocument.name}</div>
            </div>
            <div className="controls">
                {resolveInputs()}
                <CheckBox
                    checked={isChecked}
                    checkBoxStyle={{
                        checkedColor: "#34b93d",
                        size: 20,
                        unCheckedColor: "#b8b8b8"
                    }}
                    duration={400}
                />
            </div>
        </div>
    );
}
const SubmissionListProps: FC<ISubmissionListProps> = (props) => {

    const [fileBody, setFileBody] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');

    const utils = trpc.useContext();

    const handleFileInputChange = async (e: any, typeDocumentId: number ): Promise<void> => {
        const file = e.target.files && e.target.files[0];
        const onSuccess = async (documentBody: string): Promise<void> => {
           setFileBody(documentBody);
           setFileName(file?.name);
           await props.createSubmission(file?.name, documentBody, typeDocumentId);
        }
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const base64 = event.target?.result ? event.target?.result.toString() : null;
              base64 ? void onSuccess(base64) : console.log('base64 is null');
            };
            reader.readAsDataURL(file);
        }
    }
    
    const mappedSubmission = props.submissions.map((sub) => {
        return {
            typeOfDocument: props.typesOfDocument.find((el) => el.id === sub.document.typeDocument.id) ?? { id: 0, name: '' },
            isSubmitted: sub.isSubmitted,
            isCompleted: sub.document.isCompleted,
            nameDoc: sub.document.name
        }
    });
    return (
        <div className='submissionsContainer'>
            {map(props.typesOfDocument, (typeDoc) => {
                const submission = find(mappedSubmission,(el) => el.typeOfDocument.id === typeDoc.id);
                return <SubmissionItem
                            typeOfDocument={typeDoc}
                            isCompleted={submission?.isCompleted}
                            isSubmitted={submission?.isSubmitted}
                            onUploadInput={handleFileInputChange}
                            nameDoc={submission?.nameDoc}
                            key={typeDoc.name + typeDoc.id}
                        />
            })}
        </div>
    );
};

export default SubmissionListProps;