import { useEffect, useMemo, useState } from 'react';

import { fetchCollection, getApiOrigin } from './resourceApi.js';

function formatDefaultValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  if (value instanceof Date) {
    return value.toLocaleString();
  }

  if (typeof value === 'string') {
    const parsedDate = new Date(value);

    if (!Number.isNaN(parsedDate.valueOf()) && /at|date|time|created|updated|completed/i.test(value)) {
      return parsedDate.toLocaleString();
    }

    return value;
  }

  if (Array.isArray(value)) {
    return value.join(', ');
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

function isDateKey(key) {
  return /at|date|time/i.test(key);
}

export default function ResourcePage({ accent = 'warning', description, emptyMessage, endpointPath, fields, resourceName, title }) {
  const [state, setState] = useState({ status: 'loading', count: 0, records: [], error: '' });

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    setState({ status: 'loading', count: 0, records: [], error: '' });

    fetchCollection(endpointPath ?? resourceName, controller.signal)
      .then((result) => {
        if (!isMounted) {
          return;
        }

        setState({ status: 'success', ...result, error: '' });
      })
      .catch((error) => {
        if (!isMounted || error?.name === 'AbortError') {
          return;
        }

        setState({ status: 'error', count: 0, records: [], error: error instanceof Error ? error.message : `Failed to load ${title.toLowerCase()}` });
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [resourceName, title]);

  const endpoint = useMemo(
    () => `${getApiOrigin()}${endpointPath ?? `/api/${resourceName}/`}`,
    [endpointPath, resourceName],
  );

  return (
    <section className="octofit-panel p-4 p-lg-5">
      <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
        <div>
          <span className={`badge text-bg-${accent} text-dark mb-3`}>{title}</span>
          <h1 className="display-6 fw-bold mb-2">{title}</h1>
          <p className="octofit-muted mb-0">{description}</p>
        </div>

        <div className="text-lg-end">
          <div className="small text-uppercase text-secondary fw-semibold">Endpoint</div>
          <code className="d-block text-break">{endpoint}</code>
          <div className="small text-secondary mt-2">Supports arrays and paginated responses.</div>
        </div>
      </div>

      {state.status === 'loading' ? (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status" aria-label={`Loading ${title.toLowerCase()}`} />
          <div className="mt-3 octofit-muted">Loading {title.toLowerCase()}...</div>
        </div>
      ) : null}

      {state.status === 'error' ? (
        <div className="alert alert-danger mb-0" role="alert">
          {state.error}
        </div>
      ) : null}

      {state.status === 'success' ? (
        state.records.length > 0 ? (
          <div className="table-responsive">
            <table className="table octofit-table table-borderless align-middle mb-0">
              <thead>
                <tr>
                  {fields.map((field) => (
                    <th key={field.key}>{field.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state.records.map((record, index) => {
                  const rowKey = record?._id ?? record?.id ?? `${resourceName}-${index}`;

                  return (
                    <tr key={rowKey}>
                      {fields.map((field) => {
                        const value = record?.[field.key];
                        const formattedValue = field.format
                          ? field.format(value, record)
                          : isDateKey(field.key)
                            ? formatDefaultValue(value)
                            : formatDefaultValue(value);

                        return (
                          <td key={field.key}>
                            {field.key === 'trend' ? <span className="badge text-bg-secondary">{formattedValue}</span> : formattedValue}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="octofit-empty p-4 text-center">
            <h2 className="h5 mb-2">No records returned</h2>
            <p className="octofit-muted mb-0">{emptyMessage}</p>
          </div>
        )
      ) : null}
    </section>
  );
}