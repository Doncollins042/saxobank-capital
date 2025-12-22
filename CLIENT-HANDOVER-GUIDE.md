# SaxoVault Capital - Complete Admin & Operations Guide

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Admin Dashboard Guide](#admin-dashboard-guide)
3. [Managing Users](#managing-users)
4. [Managing Transactions](#managing-transactions)
5. [Investment Plans](#investment-plans)
6. [Troubleshooting](#troubleshooting)
7. [Firebase Console Guide](#firebase-console-guide)
8. [Technical Reference](#technical-reference)

---

## 🚀 Quick Start

### Admin Login Credentials
| Field | Value |
|-------|-------|
| **URL** | `https://saxovault.com/admin` |
| **Email** | `saxovaultadmin@saxovault.com` |
| **Password** | `SaxoAdmin2024!` |

### Daily Tasks Checklist
- [ ] Check pending deposits and approve/reject
- [ ] Check pending withdrawals and process
- [ ] Check pending investments and approve
- [ ] Review new user registrations
- [ ] Check email inbox for notifications

---

## 🖥️ Admin Dashboard Guide

### Accessing the Admin Panel
1. Go to `https://saxovault.com/admin`
2. Enter admin email and password
3. Click "Sign In"

### Dashboard Overview
The admin dashboard shows:
- **Total Users**: Number of registered users
- **Total Deposits**: Sum of all approved deposits
- **Pending Deposits**: Number awaiting your approval
- **Pending Withdrawals**: Number awaiting your action

### Navigation Tabs
| Tab | Purpose |
|-----|---------|
| **Users** | View and manage all registered users |
| **Transactions** | View and manage all deposits, withdrawals, and investments |
| **Settings** | Update wallet addresses, site settings |

---

## 👥 Managing Users

### Viewing Users
1. Click the "Users" tab in admin dashboard
2. See all registered users with their details:
   - Name
   - Email
   - Phone
   - Country
   - Balance
   - Registration Date

### Editing a User
1. Find the user in the list
2. Click the "Edit" button (pencil icon)
3. You can update:
   - **Balance**: Add/remove funds from their account
   - **Name**: Update their display name
   - **Status**: Active/Suspended
4. Click "Save" to confirm changes

### Adding Balance Manually
If a user made a deposit through bank transfer or other means:
1. Find the user
2. Click Edit
3. Update their balance (add the deposit amount)
4. Save changes

### User Not Appearing in List?
**Possible causes:**
1. **Firestore Rules Not Set**: User registered but data didn't save to cloud
2. **Registration Failed**: They need to try logging in or reset password

**Solution:**
- Ask user to try logging in with their credentials
- If they can't login, have them use "Forgot Password" to reset
- When they login successfully, their data will sync to the admin panel

---

## 💰 Managing Transactions

### Transaction Types
| Type | Description | Actions |
|------|-------------|---------|
| **Deposit** | User wants to add funds | Approve or Reject |
| **Withdrawal** | User wants to withdraw funds | Approve (Process) or Reject |
| **Investment** | User invested in a plan | Approve to start countdown |

### Approving a Deposit
1. Go to Transactions tab
2. Find the pending deposit
3. Verify the user sent the crypto (check wallet address)
4. Click ✅ **Approve** 
5. User's balance is automatically updated

### Rejecting a Deposit
1. Find the pending deposit
2. Click ❌ **Reject**
3. User will see their deposit was rejected

### Processing a Withdrawal
1. Go to Transactions tab
2. Find the pending withdrawal
3. **IMPORTANT**: Send the crypto to the user's wallet address shown
4. After sending, click ✅ **Approve**
5. User's balance is automatically deducted

### Approving an Investment
1. Go to Transactions tab
2. Find the pending investment
3. Verify the user paid (check their deposit)
4. Click ✅ **Approve**
5. **The countdown timer starts automatically!**
6. User can now see their investment with live countdown

---

## 📈 Investment Plans

### Current Plans Summary

#### Test Plan (For New Users)
| Detail | Value |
|--------|-------|
| Minimum | $500 (fixed) |
| Returns | 1% daily |
| Duration | 5 days |
| Total Return | $525 (5% profit) |
| Limit | One per user |

#### Crypto Investment Tiers
| Tier | Plan | Min Investment | Returns | Duration |
|------|------|----------------|---------|----------|
| 1 | Crypto Foundation | $2,500 | 12-15% | 30 days |
| 2 | DeFi Yield Pro | $5,000 | 20-28% | 45 days |
| 3 | Altcoin Alpha Fund | $10,000 | 30-42% | 60 days |
| 4 | Whale Insider Fund | $25,000 | 45-60% | 90 days |
| 5 | Crypto Elite Vault | $50,000 | 60-85% | 120 days |
| 6 | Institutional Fund | $100,000 | 80-120% | 180 days |

### How Investment Countdown Works
```
User Invests → Status: PENDING
     ↓
Admin Approves → Countdown STARTS (approval date recorded)
     ↓
User sees live countdown timer in dashboard
     ↓
When countdown ends → Investment MATURED
     ↓
Admin can then add returns to user's balance
```

### Processing Investment Payout
When an investment matures:
1. Check the investment in Transactions
2. Calculate the total payout (principal + returns)
3. Go to Users tab
4. Find the user
5. Edit their balance (add the payout amount)
6. Save changes
7. User can now withdraw their funds

---

## 🔧 Troubleshooting

### "Email Already Registered" But Not in Admin Panel

**Why this happens:**
- User started registration but it didn't complete fully
- Data is in Firebase Auth but not in Firestore

**Solution:**
1. Ask user to try logging in with their password
2. If they forgot password, use "Forgot Password" feature
3. Once they login successfully, their data syncs to admin panel

### User Can't Login

**Check:**
1. Did they verify their email? (Check inbox + spam)
2. Are they using the correct password?
3. Have them try "Forgot Password"

### Wallet Addresses

**To update your crypto wallet addresses:**
1. Go to Admin Dashboard → Settings
2. Update the wallet addresses for:
   - BTC (Bitcoin)
   - ETH (Ethereum)
   - USDT (TRC-20)
3. Click Save

**Current Wallet Addresses:**
```
BTC: bc1qzmgg6hw0fttfpczh2whp8f44k497d6pucghk58
ETH: 0x83057882eC7B7EE0cBe63C2fE2b8957e7ab69655
USDT: TLGH9FucAuPNUoQw2XUFEDtCg4FFdJ2jKG
```

### Email Notifications Not Working

**EmailJS is configured with:**
- Service: Gmail
- Notifications go to: saxovault6@gmail.com

If emails stop working:
1. Check if EmailJS free tier limit reached (200 emails/month)
2. Upgrade to paid plan if needed: https://emailjs.com

---

## 🔥 Firebase Console Guide

### Accessing Firebase Console
1. Go to: https://console.firebase.google.com
2. Login with your Google account
3. Select project: **saxovault-d94c5**

### Viewing All Users in Firebase
1. Go to Firebase Console
2. Click **Authentication** (left sidebar)
3. See all registered users with email + UID

### Deleting a User from Firebase
1. Go to Authentication
2. Find the user
3. Click the three dots (⋮) → Delete
4. **Also delete from Firestore:**
   - Go to Firestore Database
   - Navigate to `users` collection
   - Find and delete the user document

### Viewing Firestore Data
1. Go to Firebase Console
2. Click **Firestore Database**
3. Collections:
   - `users` - All user data
   - `transactions` - All deposits, withdrawals, investments

### Firestore Security Rules
Make sure these rules are set:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if true;
    }
    match /transactions/{transactionId} {
      allow read, write: if true;
    }
  }
}
```

To update:
1. Go to Firestore Database → Rules tab
2. Replace with the above rules
3. Click "Publish"

---

## 📧 Email Notifications

### What Triggers Emails

| Event | User Gets | Admin Gets |
|-------|-----------|------------|
| New Registration | ❌ | ✅ |
| Deposit Request | ✅ | ✅ |
| Withdrawal Request | ✅ | ✅ |
| Investment Made | ✅ | ✅ |
| KYC Submitted | ✅ | ✅ |

### Admin Email
All admin notifications go to: `saxovault6@gmail.com`

To change this, update the code in `App.jsx`:
```javascript
const EMAILJS_CONFIG = {
  adminEmail: 'your-new-email@gmail.com'
};
```

---

## 🔒 Security Best Practices

1. **Change admin password regularly**
2. **Keep wallet private keys secure** (never share)
3. **Verify all transactions** before approving
4. **Monitor for suspicious activity**
5. **Keep Firebase console access restricted**

---

## 📞 Technical Support

### If Website Goes Down
1. Check Hostinger: https://hpanel.hostinger.com
2. Verify DNS settings point to the correct server
3. Check if domain is expired

### If Database Issues
1. Go to Firebase Console
2. Check Firestore for any issues
3. Verify security rules are correct

### Making Code Changes
If you need to update the code:
1. Download the project files
2. Make changes in the code
3. Run `npm run build` to create new build
4. Upload the `dist` folder to Hostinger

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main application code |
| `src/firebase.js` | Firebase configuration |
| `dist/` | Production build (upload this to hosting) |

### Wallet Addresses Location
In `src/App.jsx`, search for `walletAddresses` or `cryptoOptions` to find wallet addresses.

---

## 🎯 Quick Reference Card

### Admin Daily Workflow
1. ☐ Login to admin panel
2. ☐ Check pending deposits → Verify → Approve
3. ☐ Check pending withdrawals → Process payment → Approve
4. ☐ Check pending investments → Approve to start countdown
5. ☐ Review new users
6. ☐ Check admin email for notifications

### Emergency Contacts
- Firebase: https://console.firebase.google.com
- Hostinger: https://hpanel.hostinger.com
- EmailJS: https://dashboard.emailjs.com

---

*Last Updated: December 2024*
*SaxoVault Capital v26*
