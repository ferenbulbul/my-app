const BASE_URL_Budget = 'https://v1.nocodeapi.com/orhanorhan/google_sheets/VMXojCxpiMOeDAxQ?tabId=Budget';
const BASE_URL_Login = 'https://v1.nocodeapi.com/orhanorhan/google_sheets/VMXojCxpiMOeDAxQ?tabId=Login';

export const fetchLoginData = async () => {
  try {
    const response = await fetch(BASE_URL_Login, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const postLoginData = async (username,password,email) => {
  try {
    const response = await fetch(
      BASE_URL_Login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([[username,password,email]])
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();

  } catch (error) {
    console.error(error);
  }
};
export const fetchBudgetData = async () => {
  try {
    const response = await fetch(BASE_URL_Budget, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export const updateBudgetData = async (row_id, updatedRecord) => {
  try {
    const response = await fetch(BASE_URL_Budget, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        row_id: updatedRecord.key,
        names: updatedRecord.names,
        type: updatedRecord.type,
        price: updatedRecord.price,
        date: updatedRecord.date
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};
export const postBudgetData = async (type, category, amount, date) => {
  try {
    const response = await fetch(
      BASE_URL_Budget, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([[type, category, amount, date]])
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();

  } catch (error) {
    console.error(error);
  }
};

export const deleteBudgetData = async (row_id) => {
  try {
    const response = await fetch(`${BASE_URL_Budget}&row_id=${row_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};
