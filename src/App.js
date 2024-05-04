import React, { useState } from 'react';
import { Input, Button, Modal, message, Menu, notification } from 'antd';
import { HomeOutlined, MailOutlined, TrophyOutlined } from '@ant-design/icons';



const AlertMessage = ({ visible }) => {
  return (
    <div style={{ color: '#52c41a', padding: '10px', marginBottom: '10px' }}>
      {visible && (
        <p>Nếu đợi quá lâu vui lòng liên hệ với bộ phận CSKH để được cộng tiền. Xin cảm ơn</p>
      )}
    </div>
  );
};

const App = () => {
  const [amount, setAmount] = useState('');
  const [uid, setUid] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const bankAccount = '8892063216';
  const bankName = 'BIDV';
  const accountName = 'PHAM GIA HUY';

  const formatAmount = (value) => {
    const numberOnly = value.replace(/\D/g, '');
    return numberOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleAmountChange = (e) => {
    setAmount(formatAmount(e.target.value));
  };

  const handleGenerateQR = () => {
    if (!amount || !uid) {
      message.error('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setModalVisible(true);
      setLoading(false);
    }, 2000);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirmTransaction = () => {
    setLoadingConfirm(true);
    setTimeout(() => {
      setModalVisible(false);
      notification.success({
        message: 'Thông báo',
        description: 'Chúng tôi đang kiểm tra và sẽ sớm cộng tiền vào tài khoản của bạn nhanh nhất.',
        duration: 5,
      });
      setLoadingConfirm(false);
      setShowAlert(true);
    }, 2000);
  };

  const removeCommas = (value) => {
    return value.replace(/,/g, '');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Menu mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <a href="https://shophaoquang.com/" rel="noopener noreferrer">
            Trang chủ
          </a>
        </Menu.Item>
        <Menu.Item key="muaacc" icon={<TrophyOutlined />}>
          <a href="https://shophaoquang.com/body/random/FREEFIRE" rel="noopener noreferrer">
            Mua acc uy tín
          </a>
        </Menu.Item>
        <Menu.Item key="contact" icon={<MailOutlined />}>
          <a href="https://linkbio.co/lqbcuteee" rel="noopener noreferrer">
            Liên hệ
          </a>
        </Menu.Item>
      </Menu>

      <h1 style={{ fontFamily: 'Oswald, sans-serif', marginBottom: '20px' }}>NẠP TIỀN VÀO SHOP</h1>
      <AlertMessage visible={showAlert} /> {}
      <div style={{ margin: '0 auto', maxWidth: '400px', marginBottom: '10px' }}>
        <Input
          style={{ marginBottom: '10px' }}
          placeholder="Nhập số tiền"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <div style={{ margin: '0 auto', maxWidth: '400px', marginBottom: '10px' }}>
        <Input
          style={{ marginBottom: '10px' }}
          placeholder="Nhập UID Shop"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
        />
      </div>
      <div style={{ margin: '0 auto', maxWidth: '400px' }}>
        <Button
          type="primary"
          onClick={handleGenerateQR}
          loading={loading}
          block
        >
          NẠP TIỀN
        </Button>
      </div>

      <Modal
        title="Thông tin chuyển khoản"
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Đóng
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleConfirmTransaction}
            loading={loadingConfirm}
          >
            Xác nhận giao dịch
          </Button>,
        ]}
      >
        <div>
          <img
            src={`https://img.vietqr.io/image/${bankName.toLowerCase()}-${bankAccount}-compact2.jpg?amount=${removeCommas(amount)}&addInfo=SHOPHAOQUANG%20${uid}&accountName=${encodeURIComponent(accountName)}`}
            alt="QR Code"
            style={{ maxWidth: '100%' }}
          />

          <p>STK : {bankAccount}</p>
          <p>Ngân hàng : {bankName}</p>
          <p>Tên Tài Khoản : {accountName}</p>
          <p>Nội dung chuyển khoản : SHOPHAOQUANG {uid}</p>
          <p>Số Tiền: <b>{amount}</b> VNĐ</p>
        </div>
      </Modal>
    </div>
  );
};

export default App;
