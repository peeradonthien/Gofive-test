import { test, expect } from '@playwright/test';

const URL = 'https://uat.tks.co.th/ClientPortal/Register/empeo';
const TEST_PHONE = '0967690708';
const TEST_PROMO = 'FREE15DAY'
const getRandomEmail = () => `test-automation-${Date.now()}@empeo.com`;
const getRandomCompany = () =>  `test-Company-${Date.now()}`;

//TC-001 Registration Success
test('TC-001: Should register successfully with valid data and promo code', async ({page}) => {
    await page.goto(URL,{
        timeout: 60000,
        waitUntil: 'domcontentloaded'
    });
    await page.locator('go5-radio-button:nth-child(2) > div > .go5-radio-button').click(); //click อื่นๆ
    await page.getByTestId('input_textfield_input_register_company_name').fill(getRandomCompany());
    await page.getByText('ประเภทธุรกิจ*').click();
    await page.locator('.go5-dropdown-item').first().click();
    await page.getByText('ผู้ใช้งาน*').click();
    await page.locator('.go5-dropdown-item').first().click();

    await page.getByTestId('input_textfield_input_registration_email').fill(getRandomEmail());
    await page.getByTestId('input_textfield_input_register_first_name').fill('Ilove');
    await page.getByTestId('input_textfield_input_register_last_name').fill('Gofive');
    await page.getByRole('textbox', { name: 'เบอร์มือถือ*' }).fill(TEST_PHONE);
    await page.getByText('ใช้โค้ดส่วนลด').click();
    await page.getByTestId('input_text_registration_coupon_code').fill(TEST_PROMO);
    await page.getByTestId('input_button_registration_btn_apply').click();
    await page.getByTestId('input_checkbox_registration_checkbox').check();  //click consent
    await page.getByTestId('button_submit_registration_try_for_free').click(); //click registration button
    await page.getByRole('textbox').nth(5).fill('1');
    await page.locator('input[type="tel"]').nth(2).fill('2');
    await page.locator('input[type="tel"]').nth(3).fill('3');
    await page.locator('input[type="tel"]').nth(4).fill('4');
    await page.locator('input[type="tel"]').nth(5).fill('5');
    await page.locator('#otp_5_e1hz1b5hv6wmh6b6kv0').fill('6');
    await page.locator('button.swal2-confirm:has-text("ยืนยัน")').click();
    await page.getByTestId('input_textfield_input_input_password_crate_password_password').fill('Ilovegofive123');
    await page.getByTestId('input_textfield_input_input_password_crate_password_confirm_password').fill('Ilovegofive123');
    await page.getByTestId('button_button_create_password_btn_next').click();
    await expect(page.locator('app-create-password')).toContainText('empeo พร้อมใช้งานแล้ว!');
});

//TC-002: Validation - Required Fields
test('TC-002: Validation - Required Fields', async ({page}) => {
    await page.goto(URL,{
        timeout: 60000,
        waitUntil: 'domcontentloaded'
    });
    await page.locator('go5-radio-button:nth-child(2) > div > .go5-radio-button').click(); //click อื่นๆ
    await page.getByTestId('button_submit_registration_try_for_free').click();
    await expect(page.locator('form')).toContainText('กรุณากรอกข้อมูลที่จำเป็นทั้งหมด');
    await expect(page.getByTestId('dropdown_selection_registration_company_type').getByTestId('error_message_text')).toContainText('กรุณากรอกประเภทธุรกิจ');
    await expect(page.getByTestId('dropdown_selection_registration_user_amount').getByTestId('error_message_text')).toContainText('กรุณากรอกผู้ใช้งาน');
    await expect(page.locator('form')).toContainText('กรุณากรอกอีเมล');
    await expect(page.locator('form')).toContainText('กรุณากรอกชื่อ');
    await expect(page.locator('form')).toContainText('กรุณากรอกนามสกุล');
    await expect(page.locator('form')).toContainText('กรุณากรอกเบอร์โทรศัพท์มือถือ');
    await expect(page.locator('form')).toContainText('กรุณารับทราบนโยบายความเป็นส่วนตัว และข้อกำหนดและเงื่อนไขการใช้งาน');
});

//TC-003 Validation - Invalid Email Format
test.describe('TC-003 Email Validation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL, {
            timeout: 60000,
            waitUntil: 'domcontentloaded'
        });
    });
    test('Should show error if email missing @', async ({ page }) => {
        await page.getByTestId('input_textfield_input_registration_email').fill('abc.com');
        await page.getByTestId('button_submit_registration_try_for_free').click();
        await expect(page.locator('form')).toContainText('กรุณาใส่อีเมลที่ถูกต้อง');
    });
    test('Should show error if email missing .', async ({ page }) => {
        await page.getByTestId('input_textfield_input_registration_email').fill('abc@com');
        await page.getByTestId('button_submit_registration_try_for_free').click();
        await expect(page.locator('form')).toContainText('กรุณาใส่อีเมลที่ถูกต้อง');
    });
});

//TC-004 Validation - Invalid Phone Format
test.describe('TC-004 Phone Validation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL, {
            timeout: 60000,
            waitUntil: 'domcontentloaded'
        });
    });
    test('Less than 10 digits', async ({page}) => {
        await page.getByRole('textbox', { name: 'เบอร์มือถือ*' }).fill('061111');
        await page.getByTestId('button_submit_registration_try_for_free').click();
        await expect(page.locator('form')).toContainText('รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง');
    });
    test('More than 10 digits', async ({page}) => {
        await page.getByRole('textbox', { name: 'เบอร์มือถือ*' }).fill('06111111111');
        await page.getByTestId('button_submit_registration_try_for_free').click();
        await expect(page.locator('form')).toContainText('รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง');
    });
    test('Does not begin with 0', async ({page}) => {
        await page.getByRole('textbox', { name: 'เบอร์มือถือ*' }).fill('1611111111');
        await page.getByTestId('button_submit_registration_try_for_free').click();
        await expect(page.locator('form')).toContainText('รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง');
    });
});

//TC-005 incorrect promo
test('TC-005: Incorrect Promo', async ({page}) => {
    await page.goto(URL,{
        timeout: 60000,
        waitUntil: 'domcontentloaded'
    });
  await page.locator('div').filter({ hasText: /^ใช้โค้ดส่วนลด$/ }).click();
  await page.getByTestId('input_text_registration_coupon_code').fill('FREE1DAY');
  await page.getByTestId('input_button_registration_btn_apply').click();
  await expect(page.locator('form')).toContainText('คูปองโค้ดไม่ถูกต้อง');
});

//TC-006: Invalid OTP
test('TC-006: Invalid OTP', async ({page}) => {
    await page.goto(URL,{
        timeout: 60000,
        waitUntil: 'domcontentloaded'
    });
    await page.locator('go5-radio-button:nth-child(2) > div > .go5-radio-button').click(); //click อื่นๆ
    await page.getByTestId('input_textfield_input_register_company_name').fill(getRandomCompany());
    await page.getByText('ประเภทธุรกิจ*').click();
    await page.locator('.go5-dropdown-item').first().click();
    await page.getByText('ผู้ใช้งาน*').click();
    await page.locator('.go5-dropdown-item').first().click();
    await page.getByTestId('input_textfield_input_registration_email').fill(getRandomEmail());
    await page.getByTestId('input_textfield_input_register_first_name').fill('Ilove');
    await page.getByTestId('input_textfield_input_register_last_name').fill('Gofive');
    await page.getByRole('textbox', { name: 'เบอร์มือถือ*' }).fill(TEST_PHONE);
    await page.getByText('ใช้โค้ดส่วนลด').click();
    await page.getByTestId('input_text_registration_coupon_code').fill(TEST_PROMO);
    await page.getByTestId('input_button_registration_btn_apply').click();
    await page.getByTestId('input_checkbox_registration_checkbox').check();  //click consent
    await page.getByTestId('button_submit_registration_try_for_free').click(); //click registration button
    await page.getByRole('textbox').nth(5).fill('1');
    await page.locator('input[type="tel"]').nth(2).fill('2');
    await page.locator('input[type="tel"]').nth(3).fill('3');
    await page.locator('input[type="tel"]').nth(4).fill('4');
    await page.locator('input[type="tel"]').nth(5).fill('5');
    await page.locator('#otp_5_e1hz1b5hv6wmh6b6kv0').fill('5');
    await page.locator('button.swal2-confirm:has-text("ยืนยัน")').click();

    await expect(page.getByRole('status')).toBeVisible(); // show toast
});

//TC-007 : Invalid Password
test.describe('TC-007 Invalid Password', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL,{
            timeout: 60000,
            waitUntil: 'domcontentloaded'
        });
        await page.locator('go5-radio-button:nth-child(2) > div > .go5-radio-button').click(); //click อื่นๆ
        await page.getByTestId('input_textfield_input_register_company_name').fill(getRandomCompany());
        await page.getByText('ประเภทธุรกิจ*').click();
        await page.locator('.go5-dropdown-item').first().click();
        await page.getByText('ผู้ใช้งาน*').click();
        await page.locator('.go5-dropdown-item').first().click();

        await page.getByTestId('input_textfield_input_registration_email').fill(getRandomEmail());
        await page.getByTestId('input_textfield_input_register_first_name').fill('Ilove');
        await page.getByTestId('input_textfield_input_register_last_name').fill('Gofive');
        await page.getByRole('textbox', { name: 'เบอร์มือถือ*' }).fill(TEST_PHONE);
        await page.getByText('ใช้โค้ดส่วนลด').click();
        await page.getByTestId('input_text_registration_coupon_code').fill(TEST_PROMO);
        await page.getByTestId('input_button_registration_btn_apply').click();
        await page.getByTestId('input_checkbox_registration_checkbox').check();  //click consent
        await page.getByTestId('button_submit_registration_try_for_free').click(); //click registration button
        await page.getByRole('textbox').nth(5).fill('1');
        await page.locator('input[type="tel"]').nth(2).fill('2');
        await page.locator('input[type="tel"]').nth(3).fill('3');
        await page.locator('input[type="tel"]').nth(4).fill('4');
        await page.locator('input[type="tel"]').nth(5).fill('5');
        await page.locator('#otp_5_e1hz1b5hv6wmh6b6kv0').fill('6');
        await page.locator('button.swal2-confirm:has-text("ยืนยัน")').click();
    });

    test('Empty field', async ({page}) => {
        await page.getByTestId('input_textfield_input_input_password_crate_password_password').click();
        await page.locator('.go5-form-field.go5-primary.go5-enabled.go5-hover > .go5-form-field-block > .go5-form-field-content-template > .go5-form-field-content-template-body').click();
        await expect(page.getByText('กรุณากรอกรหัสผ่าน')).toBeVisible();
        await page.getByTestId('input_textfield_input_input_password_crate_password_password').click();
        await expect(page.getByText('กรุณายืนยันรหัสผ่าน')).toBeVisible();
        await expect(page.getByTestId('button_button_create_password_btn_next')).toBeDisabled();
    });

    test('No capital letters', async ({page}) => {
        await page.getByTestId('input_textfield_input_input_password_crate_password_password').fill('aaaa1234');
        await page.getByTestId('input_textfield_input_input_password_crate_password_confirm_password').fill('aaaa1234');
        await expect(page.getByTestId('button_button_create_password_btn_next')).toBeDisabled();
    });

    test('No number', async ({page}) => {
        await page.getByTestId('input_textfield_input_input_password_crate_password_password').fill('Aaaaaaaa');
        await page.getByTestId('input_textfield_input_input_password_crate_password_confirm_password').fill('Aaaaaaaa');
        await expect(page.getByTestId('button_button_create_password_btn_next')).toBeDisabled();
    });

    test('Less than 8 digit', async ({page}) => {
        await page.getByTestId('input_textfield_input_input_password_crate_password_password').fill('Aaaaaa1');
        await page.getByTestId('input_textfield_input_input_password_crate_password_confirm_password').fill('Aaaaaa1');
        await expect(page.getByTestId('button_button_create_password_btn_next')).toBeDisabled();
    });

    test('Confirm password not match', async ({page}) => {
        await page.getByTestId('input_textfield_input_input_password_crate_password_password').fill('Gofive12');
        await page.getByTestId('input_textfield_input_input_password_crate_password_confirm_password').fill('Gofive13');
        await page.getByTestId('button_button_create_password_btn_next').click();
        await expect(page.getByText('รหัสผ่านไม่ตรงกัน')).toBeVisible();
    });
});