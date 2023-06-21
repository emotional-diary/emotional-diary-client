import React from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';

import { theme } from 'src/theme';
import 'react-quill/dist/quill.snow.css';

const TextEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  background-color: ${theme.palette.background.paper};
  border-radius: 30px 30px 0px 0px;
  margin-top: 40px;

  .ql-toolbar {
    background-color: ${theme.palette.primary.main};
    border: none;
    border-radius: 10px;
    margin: 20px 30px 25px;
  }
  .ql-container {
    font-size: 16px;
    line-height: 18px;
    font-family: 'GangwonEduAll', sans-serif;
    border: none;
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
  const [text, setText] = React.useState<string>('');

  console.log('text', text);

  return (
    <TextEditorWrapper>
      <ReactQuill
        value={text}
        onChange={(value: string) => setText(value)}
        modules={{
          toolbar: [['bold'], [{ align: [] }]],
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
        formats={[
          'bold',
          'align',
          // 'header',
          // 'italic',
          // 'underline',
          // 'strike',
          // 'blockquote',
          // 'list',
          // 'bullet',
          // 'indent',
          // 'link',
          // 'image',
        ]}
        placeholder={'일기를 작성해주세요!'}
      />
    </TextEditorWrapper>
  );
};

export default TextEditor;
