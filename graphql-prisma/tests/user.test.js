import { getFirstName, isValidPassword } from "../src/utils/user";
test("Should return first name when given fullname", () => {
  const firstName = getFirstName("Siddhant Manchanda");
  expect(firstName).toBe("Siddhant");
});

test("Should return first name when given firstName only", () => {
  const firstName = getFirstName("Siddhant");
  expect(firstName).toBe("Siddhant");
});

test("Should reject a password of it smaller than 8 letters", () => {
  const isValid = isValidPassword("Sid");
  expect(isValid).toBe(false);
});
test("Should reject if the password includes word password", () => {
  const isValid = isValidPassword("PasSword123");
  expect(isValid).toBe(false);
});
test("Should validate a correct password",()=>{
    const isValid = isValidPassword("YEST@12438u12");
    expect(isValid).toBe(true);
})