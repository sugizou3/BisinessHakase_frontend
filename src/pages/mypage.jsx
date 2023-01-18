import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import Avatar from "@mui/material/Avatar";

export default function mypage() {
  return (
    <Layout title="Search">
      <div className="flex justify-center mt-5">
        <div className="bg-gray-500 w-48 h-48">
          {/* <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 192, height: 192 }}
          /> */}

          <Avatar src="/broken-image.jpg" sx={{ width: 192, height: 192 }} />
        </div>
        <div className="bg-gray-400 w-132 h-48">
          <div className="flex">
            <div className="bg-gray-600 w-3/5 h-16"></div>
            <div className="bg-gray-700 w-2/5 h-16">プロフィールを編集</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
