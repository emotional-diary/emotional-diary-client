import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';

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

const TextEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
    padding: 0px 30px 120px;
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 0px;
    }
  }
  .ql-editor {
    min-height: 300px;
    padding: 0px;
  }
  /* placeholder */
  .ql-editor.ql-blank::before {
    left: 30px;
    font-style: normal;
    color: ${theme.palette.gray.main};
  }
`;

const TextEditor = () => {
  const { diary, setDiary } = useDiaryStore();

  return (
    <TextEditorWrapper>
      <CustomToolbar date={diary.diaryAt} />
      <ReactQuill
        value={diary.content}
        onChange={(value: string) => {
          setDiary({
            ...diary,
            content: value,
          });
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
