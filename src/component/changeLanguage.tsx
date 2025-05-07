"use client"
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';

export default function LanguagetMenu({ handleLanguageChange  , selectedLanguage }) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { t, i18n } = useTranslation();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  interface HandleLanguageSelectProps {
    (language: string): void;
  }

  const handleLanguageSelect: HandleLanguageSelectProps = (language) => {
    handleLanguageChange(language);
    i18n.changeLanguage(language); // Change the language in i18next
    handleClose();
  };


  return (
    <React.Fragment>
      <Box
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          zIndex: 1000,
        }}
      >
        <Tooltip title="Change language">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} src={selectedLanguage === 'ar' ? '/assets/images/saudi.png' : '/assets/images/usa.png'} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 25,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleLanguageSelect('ar')}>
          <Avatar src='/assets/images/saudi.png' />
          {t('Arabic')}
        </MenuItem>
        <MenuItem onClick={() => handleLanguageSelect('en')}>
          <Avatar src='/assets/images/usa.png' />
          {t('English')}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}