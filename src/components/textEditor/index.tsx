import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import Resizer from 'react-image-file-resizer';

import { useDiaryStore } from '@store/index';
import { Typography } from '@components/typography';
import { dateToSting } from '@utils/index';
import { theme } from 'src/theme';
import 'react-quill/dist/quill.snow.css';

const CustomToolbar = ({ date }: { date: string }) => (
  <div id="ql-toolbar">
    <Typography
      variant={'h4'}
      color={'gray.dark'}
      style={{ marginRight: 'auto' }}
    >
      {dateToSting(date)}
    </Typography>

    <div>
      <select className="ql-align" defaultValue="">
        <option value=""></option>
        <option value="center"></option>
        <option value="right"></option>
        <option value="justify"></option>
      </select>
      {/* <button className="ql-align" value=""></button>
      <button className="ql-align" value="center"></button>
      <button className="ql-align" value="right"></button>
      <button className="ql-align" value="justify"></button> */}
      <button className="ql-bold"></button>
      <button className="ql-image"></button>
    </div>
  </div>
);

const TextEditorWrapper = styled.div<{ $calculatedHeight: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${theme.palette.background.paper};
  border-radius: 30px 30px 0px 0px;
  margin-top: 40px;

  .ql-toolbar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border: none !important;
    border-radius: 10px;
    padding: 25px 30px 20px !important;
    font-family: 'GangwonEduAll', sans-serif !important;
  }
  .ql-container {
    font-size: 16px;
    line-height: 18px;
    font-family: 'GangwonEduAll', sans-serif;
    border: none !important;
    padding: 0px 30px;
    overflow-y: auto;
  }
  .ql-editor {
    min-height: ${props => props.$calculatedHeight}px;
    max-height: ${props => props.$calculatedHeight}px;
    padding: 0px;
  }
  /* placeholder */
  .ql-editor.ql-blank::before {
    left: 30px;
    font-style: normal;
    color: ${theme.palette.gray.main};
  }
`;

const resizeFile = (file: File) =>
  new Promise(resolve => {
    Resizer.imageFileResizer(
      file,
      600,
      800,
      'JPEG',
      100,
      0,
      uri => {
        resolve(uri);
      },
      'base64',
      80,
      80
    );
  });

const TextEditor = () => {
  const { diary, setDiary, setPrevDiary } = useDiaryStore();
  const [clientHeight, setClientHeight] = React.useState<number>(
    window.innerHeight
  );

  const quillRef = React.useRef<ReactQuill>(null);

  const calculatedHeight = React.useMemo(() => {
    if (clientHeight > 800) return clientHeight * 0.45;
    if (clientHeight > 750) return clientHeight * 0.4;
    if (clientHeight > 700) return clientHeight * 0.35;
    return clientHeight * 0.33;
  }, [clientHeight]);

  const handleImageUpload = async (file: File) => {
    const resizedImage = (await resizeFile(file)) as string;

    console.log('resizedImage', resizedImage);

    setPrevDiary(prevDiary => {
      return {
        ...prevDiary,
        images: [...(prevDiary?.images ?? []), resizedImage],
      };
    });
  };

  const validateImage = (file: File) => {
    if (file.size > 1024 * 1024 * 5) {
      alert('5MB 이하의 이미지만 업로드 가능합니다.');
      return false;
    }
    if (!file.type.includes('image')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return false;
    }
    if (file.type.includes('gif')) {
      alert('gif 파일은 업로드 할 수 없습니다.');
      return false;
    }
    return true;
  };

  React.useEffect(() => {
    if (!quillRef.current) return;
    quillRef.current.focus();
  }, []);

  React.useEffect(() => {
    if (!quillRef.current) return;

    const toolbar = quillRef.current.getEditor().getModule('toolbar');
    toolbar.addHandler('image', () => {
      if (diary.images?.length === 3) {
        alert('이미지는 최대 3개까지 업로드 가능합니다.');
        return;
      }
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();
      input.onchange = async () => {
        const file = input.files?.[0];
        console.log('file', file);

        if (!file) return;
        if (!validateImage(file)) return;

        handleImageUpload(file);

        // const formData = new FormData();
        // formData.append('image', file);
        // const res = await fetch('/api/upload', {
        //   method: 'POST',
        //   body: formData,
        // });
        // const imageUrl = await res.text();
      };
    });
  }, [diary.images]);

  React.useEffect(() => {
    const handleResize = () => {
      setClientHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <TextEditorWrapper $calculatedHeight={calculatedHeight}>
      <CustomToolbar date={diary.diaryAt} />
      <ReactQuill
        ref={quillRef}
        value={diary.content}
        onChange={(value, delta, source, editor) => {
          console.log('params', {
            value,
            delta,
            source,
            editor: editor.getContents(),
          });

          setDiary({
            ...diary,
            content: value,
          });

          // const images: string =
          //   delta.ops?.[0]?.insert?.image ?? delta.ops?.[1]?.insert?.image;

          // setPrevDiary(prevDiary => {
          //   return {
          //     ...prevDiary,
          //     ...(images
          //       ? { images: [...(prevDiary?.images ?? []), images] }
          //       : { content: value }),
          //   };
          // });
          console.log('diary', diary);
        }}
        modules={{
          toolbar: { container: '#ql-toolbar' },
          // toolbar: [[{ align: [] }], ['bold'], ['image']],

          // toolbar: [
          //   [{ header: [1, 2, false] }],
          //   ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          //   [
          //     { align: [] },
          //     { list: 'ordered' },
          //     { list: 'bullet' },
          //     { indent: '-1' },
          //     { indent: '+1' },
          //   ],
          //   ['link', 'image'],
          // ],
        }}
        // formats={[
        //   'align',
        //   'bold',
        //   'image',

        //   // 'header',
        //   // 'italic',
        //   // 'underline',
        //   // 'strike',
        //   // 'blockquote',
        //   // 'list',
        //   // 'bullet',
        //   // 'indent',
        //   // 'link',
        // ]}
        placeholder={'일기를 작성해주세요!'}
      />
    </TextEditorWrapper>
  );
};

export default TextEditor;
