export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-6 md:py-8">
        <hr className="my-6 border-gray-200 dark:border-gray-700" />
        <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            BookHive
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
