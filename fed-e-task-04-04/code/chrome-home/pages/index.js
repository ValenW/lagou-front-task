import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useFormik } from "formik";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [tiles, setTiles] = useState([
    {
      title: "百度一下，你就知道",
      link: "https://www.baidu.com",
    },
  ]);

  const handleSubmit = () => {
    setTiles([
      ...tiles,
      {
        title: formik.values.title,
        link: formik.values.link,
      },
    ]);
    handleClose();
  };
  const handleClose = () => {
    formik.resetForm();
    formik.setErrors({});
    setVisible(false);
  };
  const formik = useFormik({
    initialValues: { link: "", title: "" },
    validate: (values) => {
      const errors = {};
      if (!values.link) {
        errors.link = "链接不能为空";
      }
      return errors;
    },
    onSubmit: handleSubmit,
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Google</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <img className={styles.google} src="/google.png" alt="google" />
        <div className={styles.inputWrapper}>
          <input type="text" placeholder="在 Google 上搜索，或者输入一个网址" />
          <span className={styles.icon}></span>
          <button
            className={styles.voiceSearchButton}
            title="语音搜索"></button>
        </div>
        <div className={styles.quick}>
          {tiles.map((tile, index) => (
            <a
              key={index}
              className={styles.tile}
              title={tile.title}
              href={tile.link}>
              <div className={styles.tileIcon}>
                <img draggable="false" src={`${tile.link}/favicon.ico`} />
              </div>
              <div className={styles.tileTitle}>
                <span>{tile.title}</span>
              </div>
            </a>
          ))}
          {tiles.length < 10 && (
            <button
              className={styles.addShortcut}
              onClick={() => setVisible(true)}>
              <div className={styles.tileIcon}>
                <div className={styles.addShortcutIcon} draggable="false"></div>
              </div>
              <div className={styles.tileTitle}>
                <span>添加快捷方式</span>
              </div>
            </button>
          )}
        </div>
      </main>

      <Dialog
        open={visible}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">添加快捷方式</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="名称"
            variant="outlined"
            fullWidth
            {...formik.getFieldProps("title")}
          />
          <TextField
            margin="dense"
            label="链接"
            variant="outlined"
            fullWidth
            error={formik.touched.link && formik.errors.link}
            helperText={formik.touched.link && formik.errors.link}
            {...formik.getFieldProps("link")}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="small"
            onClick={handleClose}
            style={{ marginRight: "auto" }}>
            删除
          </Button>
          <Button variant="outlined" size="small" onClick={handleClose}>
            取消
          </Button>
          <Button variant="outlined" size="small" onClick={formik.handleSubmit}>
            完成
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
